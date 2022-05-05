import express from 'express';
import mongoose from 'mongoose';

import HotelData from '../models/hotelData.js';

const router = express.Router();

export const getHotels = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await HotelData.countDocuments({});
        const hotels = await HotelData.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: hotels, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getHotelsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const hotels = await HotelData.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: hotels });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getHotelsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const hotels = await HotelData.find({ name });

        res.json({ data: hotels });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getHotel = async (req, res) => { 
    const { id } = req.params;

    try {
        const hotel = await HotelData.findById(id);
        
        res.status(200).json(hotel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createHotel = async (req, res) => {
    const hotel = req.body;

    const newHotelData = new HotelData({ ...hotel, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newHotelData.save();

        res.status(201).json(newHotelData);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateHotel = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hotel with id: ${id}`);

    const updatedHotel = { creator, title, message, tags, selectedFile, _id: id };

    await HotelData.findByIdAndUpdate(id, updatedHotel, { new: true });

    res.json(updatedHotel);
}

export const deleteHotel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hotel with id: ${id}`);

    await HotelData.findByIdAndRemove(id);

    res.json({ message: "hotel deleted successfully." });
}

export const likeHotel = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Hotel with id: ${id}`);
    
    const hotel = await HotelData.findById(id);

    const index = hotel.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      hotel.likes.push(req.userId);
    } else {
      hotel.likes = hotel.likes.filter((id) => id !== String(req.userId));
    }

    const updatedHotel = await HotelData.findByIdAndUpdate(id, hotel, { new: true });

    res.status(200).json(updatedHotel);
}

export const commentHotel = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const hotel = await HotelData.findById(id);

    hotel.comments.push(value);

    const updatedHotel = await HotelData.findByIdAndUpdate(id, hotel, { new: true });

    res.json(updatedHotel);
};

export default router;
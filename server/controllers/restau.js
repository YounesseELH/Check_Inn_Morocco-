import express from 'express';
import mongoose from 'mongoose';

import RestauData from '../models/restauData.js';

const router = express.Router();

export const getRestaus = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await RestauData.countDocuments({});
        const restaus = await RestauData.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: restaus, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getRestausBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const restaus = await RestauData.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: restaus });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getRestausByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const restaus = await RestauData.find({ name });

        res.json({ data: restaus });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getRestau = async (req, res) => { 
    const { id } = req.params;

    try {
        const restau = await RestauData.findById(id);
        
        res.status(200).json(restau);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createRestau = async (req, res) => {
    const restau = req.body;

    const newRestauData = new RestauData({ ...restau, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newRestauData.save();

        res.status(201).json(newRestauData);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateRestau = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No restau with id: ${id}`);

    const updatedRestau = { creator, title, message, tags, selectedFile, _id: id };

    await RestauData.findByIdAndUpdate(id, updatedRestau, { new: true });

    res.json(updatedRestau);
}

export const deleteRestau = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No restau with id: ${id}`);

    await RestauData.findByIdAndRemove(id);

    res.json({ message: "Restau deleted successfully." });
}

export const likeRestau = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Restau with id: ${id}`);
    
    const restau = await RestauData.findById(id);

    const index = restau.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      restau.likes.push(req.userId);
    } else {
      restau.likes = restau.likes.filter((id) => id !== String(req.userId));
    }

    const updatedRestau = await RestauData.findByIdAndUpdate(id, restau, { new: true });

    res.status(200).json(updatedRestau);
}

export const commentRestau = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const restau = await RestauData.findById(id);

    restau.comments.push(value);

    const updatedRestau = await RestauData.findByIdAndUpdate(id, restau, { new: true });

    res.json(updatedRestau);
};

export default router;
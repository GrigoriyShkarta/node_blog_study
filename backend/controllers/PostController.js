import PostModel from "../models/Post.js";
import mongoose from "mongoose";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'invalid get posts'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!doc) {
            return res.status(404).json({
                message: "message not found"
            });
        }

        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'invalid get posts'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = PostModel.findOneAndRemove({_id: postId});

        if (!doc) {
            return res.status(404).json({
                message: "post not found"
            });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'invalid get posts'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId =  new mongoose.Types.ObjectId(req.params.id);
        const updatePost = {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags
        }

        const doc = await PostModel.findOneAndUpdate(postId, updatePost);

        if (!doc) {
            return res.status(404).json({
                message: "post not found"
            });
        }

        await doc.save()

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'invalid get posts'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'invalid create post'
        })
    }
}
const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const Auth = require('../../utils/authentication');

router.post('/', Auth, async (req, res) => {
    try { 
        const { user_id, ...commentData } = req.body;
        const createComment = await Comment.create({
            ...commentData,
            user_id: req.session.user_id,
        });
        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the comment' });
    }
});
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// middleware
const verifyToken = require('../middleware/authMiddleware');

// @route GET /api/posts
// @desc get posts
// access private (Chỉ khi đăng nhập mới có thể nhìn thấy posts)
router.get('/', verifyToken, async (req, res) => {
    try {
        // gắn thêm thằng user(các property của user và chỉ lấy ra username)
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username',
        ]);
        res.json({ success: true, posts });
    } catch (error) {
        console.log('err: ', error);
    }
});

// @route POST /api/posts
// @desc create posts
// access private

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // simple validation
    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'title is required' });
    }

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || 'to learn',
            user: req.userId,
        });

        await newPost.save();
        res.json({ success: true, newPost });
    } catch (error) {
        console.log('error', error);
    }
});

// @route PUT /api/posts
// @desc update posts
// access private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    // simple validation
    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'title is required' });
    }
    try {
        let postUpdate = {
            title,
            description: description || '',
            url: url.startsWith('http://') ? url : `http://${url}` || '',
            status: status || 'to learn',
        };

        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        postUpdate = await Post.findOneAndUpdate(
            postUpdateCondition,
            postUpdate,
            {
                new: true,
            }
        );
        // Công dụng của option new: true là trả ra thông tin của post đã được update

        // user not authorised to update post or post not found
        if (!postUpdate) {
            return res.status(401).json({
                success: false,
                message: 'user not authorised to update post or post not found',
            });
        }
        return res.json({
            success: true,
            message: 'Excellent progress!',
            postUpdate,
        });
    } catch (error) {
        console.log('error', error);
    }
});

// @route DELETE /api/posts
// @desc update post
// access private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
        if (!deletedPost) {
            return res.status(401).json({
                success: false,
                message: 'user not authorised to delete post or post not found',
            });
        }
        return res.json({
            success: true,
            post: deletedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post Model
const Post = require('../../models/Post')

// Load Post validation
const validatePostInput = require('../../validation/post');

// @route POST api/posts
// @desc  Create post
// @access Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body);

        // Check validation
        if (!isValid) {
            // Return errors with 400 response
            res.status(400).json(errors);
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.body.id
        });

        newPost.save().then(post => res.json(post));
    }
);

module.exports = router;
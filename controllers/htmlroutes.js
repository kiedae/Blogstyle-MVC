const router = require('express').Router();
const express = require('express');
const { Post, User, Comment} = require('../models')
const withAuth = require('../utils/authentication');
router.get('/', async (req, res) => {
    try {
const posts = await Post.findAll({
        include: [{ mdoel: User, attributes: ['username'] }],
        
        });
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
}); 
} catch (err) {
    res.status(500).json({ message: 'Couldnt find'});
}
});

router.get('/login', (req, res) => {
    const loginPath = path.join(__dirname, '..', 'views', 'login.handlebars');
    res.sendFile(loginPath);
});

router.get('/dashboard', (req, res) => {
    const dashboardPath = path.join(__dirname, '..', 'views', 'dashboard.handlebars');
    res.sendFile(dashboardPath);
});

router.get('/post', (req, res) => {
    const postPath = path.join(__dirname, '..', 'views', 'post.handlebars');
    res.sendFile(postPath);
});

router.get('/dashboard', (req, res) => {
    const homepagePath = path.join(__dirname, '..', 'views', 'homepage.handlebars');
    res.sendFile(homepagePath);
});

const router = require('express').Router();
const express = require('express');
const path = require('path');

const loginPage = require('../views/login.handlebars');

router.get('', (req, res) => {
    const mainPath = path.join(__dirname, '..', 'views', 'layouts', 'main.handlebars');
    res.sendFile(mainPath);
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

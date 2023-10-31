const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const Auth = require('../utils/authentication');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });

        const post = posts.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts: post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Could not find posts' });
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });

        if (!post) {
            return res.status(404).json('Post not found with that ID.');
        }

        res.render('post', {
            post: post.get({ plain: true }),
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error. Please try again later.');
    }
});

router.get('/dashboard', Auth, async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }],
        });

        const post = posts.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts: post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json('Internal Server Error. Please try again later.');
    }
});

router.get('/create-post', (req, res) => {
    if (req.session.logged_in) {
        res.render('createpost');
    } else {
        res.redirect('/signup');
    }
});

router.get('/editpost/:id', Auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });

        if (!post) {
            return res.status(404).json('Post not found with that ID.');
        }

        const plainPost = post.get({ plain: true });

        res.render('editpost', Object.assign({}, plainPost, { logged_in: true }));
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error. Please try again later.');
    }
});

module.exports = router;
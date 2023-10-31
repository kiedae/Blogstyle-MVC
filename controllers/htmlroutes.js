const router = require('express').Router();
const { Post, User, Comment} = require('../models')
const Auth = require('../utils/authentication');

router.get('/', async (req, res) => {
    try {
const posts = await Post.findAll({
        include: [{ mdoel: User, attributes: ['username'] }],
        
        });

        const post = posts.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
}); 
} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Couldnt find'});
}
});

router.get('/login', (req, res) => {
 if (req.session.logged_in) {
    res.redirect('/');
    return;
 } else {
    res.render('login');
 }
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
        include: [{
            model: User,
            model: Comment,
            include: [{ model: User, atributes: ['username'] }]
        }]
    });
});

router.get('/dashboard', Auth, async (req, res) => {
    try {
        const posts = await Post.findAll({ 
            where: { user_id: req.session.user_id },
            include: [{ model: User, atributes: ["username"] }],
        });
        const post = posts.map((post) => post.get({ plain: true }))

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('create-post', (req, res) => {
    if (req.session.logged_in) {
        res.render("createpost");
        return;
    } else {
        res.redirect('/signup');
    }
})


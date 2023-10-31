const express = require('express');
const router = express.Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error. Please try again later.");
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });

    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    res.status(201).json("User successfully created.");
  } catch (error) {
    console.error(error);
    res.status(400).json("Failed to create a new user. Please check your input.");
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({  where: { username } });

    if (!user) {
      return res.status(400).json("Incorrect username or password. Please try again.");
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json("Incorrect email or password. Please try again.");
    }

    req.session.user_id = user.id;
    req.session.logged_in = true;

    res.json("You are now logged in!");
  } catch (error) {
    console.error(error);
    res.status(400).json("Login failed. Please try again.");
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
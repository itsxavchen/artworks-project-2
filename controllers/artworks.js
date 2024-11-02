const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('artworks/index.ejs', {
      artworks: currentUser.artworks,
    });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.get('/new', async (req, res) => {
  res.render('artworks/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.artworks.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/artworks`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.get('/:artworkId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const artwork = currentUser.artworks.id(req.params.artworkId);
    res.render('artworks/show.ejs', {
      artwork: artwork,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.delete('/:artworkId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.artworks.id(req.params.artworkId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/artworks`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.get('/:artworkId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const artwork = currentUser.artworks.id(req.params.artworkId);
    res.render('artworks/edit.ejs', {
      artwork: artwork,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.put('/:artworkId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const artwork = currentUser.artworks.id(req.params.artworkId);
    artwork.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/artworks/${req.params.artworkId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

module.exports = router;
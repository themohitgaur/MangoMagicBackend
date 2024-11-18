const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Post = require('../models/Post');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { numberOfIceCreams, dateOfIceCream, placeOfIceCream, ateInGroup } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const post = new Post({
      userId: req.user.id,
      numberOfIceCreams,
      dateOfIceCream,
      placeOfIceCream,
      ateInGroup,
      imageUrl,
    });
    await post.save();
    res.status(201).send('Post created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const filters = req.query;
    const posts = await Post.find(filters).populate('userId', 'username profileImage');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

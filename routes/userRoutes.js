const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.put('/profile', authMiddleware, upload.single('profileImage'), async (req, res) => {
  try {
    const profileImage = `/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user.id, { profileImage });
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

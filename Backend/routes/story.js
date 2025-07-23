const express = require('express');
const multer = require('multer');
const router = express.Router();
const Story = require('../models/Story');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { userId, text } = req.body;
  const story = new Story({
    userId,
    text,
    image: req.file?.filename || null,
  });
  await story.save();
  res.status(201).json(story);
});

router.get('/:userId', async (req, res) => {
  const stories = await Story.find({ userId: req.params.userId });
  res.json(stories);
});

router.delete('/:id', async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;

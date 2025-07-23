const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  userId: String,
  text: String,
  image: String,
});

module.exports = mongoose.model('Story', storySchema);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/story');

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('./uploads',express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

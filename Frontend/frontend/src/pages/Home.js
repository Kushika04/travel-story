import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';
import axios from 'axios';

export default function Home() {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username'); // Optional: store during login
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [stories, setStories] = useState([]);

  const fetchStories = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/stories/${userId}`);
      setStories(res.data.reverse()); // Show latest first
    } catch (err) {
      console.error('Error fetching stories', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('userId', userId);
    form.append('text', text);
    form.append('image', image);
    try {
      await axios.post('http://localhost:5000/api/stories', form);
      setText('');
      setImage(null);
      fetchStories();
    } catch (err) {
      console.error('Error posting story', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stories/${id}`);
      fetchStories();
    } catch (err) {
      console.error('Error deleting story', err);
    }
  };

  return (
    <div className="home-container">
      <h2>Your Travel Stories {username && `, ${username}`}</h2>

      <form onSubmit={handleSubmit} className="story-form">
        <textarea
          placeholder="Write your story..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Post</button>
      </form>

      <div className="story-list">
        {stories.length === 0 ? (
          <p>No stories yet. Start posting!</p>
        ) : (
          stories.map((story) => (
            <div className="story-card" key={story._id}>
              <p>{story.text}</p>
              {story.image && (
                <img
                  src={`http://localhost:5000/uploads/${story.image}`}
                  alt="story" 
                />
              )}
              <button onClick={() => handleDelete(story._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

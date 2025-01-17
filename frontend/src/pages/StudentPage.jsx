import React, { useState } from 'react';
import axios from 'axios';
import '../styles/StudentPage.css';

// Import images from src/assets
import smiley from '../assets/smiley.png';
import frowny from '../assets/frowny.png';
import surprised from '../assets/surprised.png';
import confused from '../assets/confused.png';

const StudentPage = () => {
  const [accessCode, setAccessCode] = useState('');
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');

  // Map emotions to their images
  const emotionImages = {
    smiley,
    frowny,
    surprised,
    confused,
  };

  // Fetch activity details by access code
  const fetchActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/activities/access-code/${accessCode}`);
      setActivity(response.data);
      setError('');
    } catch (error) {
      setError('Invalid access code. Please try again.');
      setActivity(null);
    }
  };

  // Submit feedback
  const submitFeedback = async (emotion) => {
    try {
      await axios.post('/api/feedback', {
        emotion,
        activityAccessCode: accessCode,
      });
      setSuccess(`Feedback for ${emotion} submitted successfully!`);
      setError('');
      setSelectedEmotion(emotion);
    } catch (error) {
      setError('Failed to submit feedback. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="student-page">
      <h1>Student Feedback</h1>

      {!activity && (
        <form onSubmit={fetchActivity} className="access-code-form">
          <h2>Enter Access Code</h2>
          <input
            type="text"
            placeholder="Enter Access Code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}

      {activity && (
        <div className="activity-details">
          <h2>Activity Details</h2>
          <p>
            <strong>Description:</strong> {activity.description}
          </p>
          <p>
            <strong>Start Time:</strong> {new Date(activity.startTime).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong> {new Date(activity.endTime).toLocaleString()}
          </p>

          <h3>Submit Feedback</h3>
          <div className="emoticons">
            {Object.keys(emotionImages).map((emotion) => (
              <button
                key={emotion}
                className={`emotion-button ${selectedEmotion === emotion ? 'selected' : ''}`}
                onClick={() => submitFeedback(emotion)}
              >
                <img src={emotionImages[emotion]} alt={emotion} />
              </button>
            ))}
          </div>

          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default StudentPage;
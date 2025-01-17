import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfessorPage.css';

const ProfessorPage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch activities on component mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Fetch all activities
  const fetchActivities = async () => {
    try {
      const response = await axios.get('/api/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to fetch activities.');
    }
  };

  // Handle activity creation
  const createActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/activities', {
        description,
        startTime,
        endTime,
      });
      setSuccess('Activity created successfully!');
      setError('');
      setDescription(''); // Clear form fields
      setStartTime('');
      setEndTime('');
      fetchActivities(); // Refresh activities list
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Display backend error
      } else {
        setError('Failed to create activity. Please check your input.');
      }
      setSuccess('');
    }
  };

  // Fetch feedback for a specific activity
  const fetchFeedback = async (activityId) => {
    try {
      const response = await axios.get(`/api/feedback/activity/${activityId}`);
      setFeedback(response.data);
      setSelectedActivity(activityId);
      setError('');
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to fetch feedback for the selected activity.');
    }
  };

  return (
    <div className="professor-page">
      <h1>Professor's Dashboard</h1>

      {/* Create Activity Form */}
      <form onSubmit={createActivity} className="activity-form">
        <h2>Create Activity</h2>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Activity</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {/* Activities List */}
      <h2>All Activities</h2>
      <ul className="activities-list">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-item">
            <div>
              <strong>{activity.description}</strong>
              <p>
                Start: {new Date(activity.startTime).toLocaleString()}, End: {new Date(activity.endTime).toLocaleString()}
              </p>
            </div>
            <button
              className="view-feedback-button"
              onClick={() => fetchFeedback(activity.id)}
            >
              View Feedback
            </button>
          </li>
        ))}
      </ul>

      {/* Feedback Section */}
      {selectedActivity && (
        <div className="feedback-section">
          <h2>Feedback for Activity {selectedActivity}</h2>
          <ul>
            {feedback.map((item) => (
              <li key={item.id} className="feedback-item">
                <p>
                  <strong>{item.emotion}</strong> at{' '}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfessorPage;
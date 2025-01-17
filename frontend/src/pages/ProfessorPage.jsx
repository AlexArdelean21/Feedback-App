import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfessorPage.css';

const ProfessorPage = () => {
  const [activities, setActivities] = useState([]);
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
      fetchActivities(); // Refresh activities list
    } catch (error) {
      setError('Failed to create activity. Please check your input.');
      setSuccess('');
    }
  };

  return (
    <div className="professor-page">
      <h1>Professor's Dashboard</h1>

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

      <h2>All Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.description} (Start: {new Date(activity.startTime).toLocaleString()}, End: {new Date(activity.endTime).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorPage;
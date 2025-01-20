import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfessorPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfessorPage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/activities`);
      setActivities(response.data);
    } catch (error) {
      toast.error('Failed to fetch activities.');
    }
  };
  
  const createActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/activities`, {
        description,
        startTime,
        endTime,
      });
      toast.success('Activity created successfully!');
      setDescription('');
      setStartTime('');
      setEndTime('');
      fetchActivities();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create activity.');
    }
  };
  
  const fetchFeedback = async (activity) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feedback/activity/${activity.id}`);
      setFeedback(response.data);
      setSelectedActivity(activity); // Store the full activity object
    } catch (error) {
      toast.error('Failed to fetch feedback for the selected activity.');
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/activities/${activityId}`);
      toast.success('Activity deleted successfully!');
      fetchActivities();
    } catch (error) {
      toast.error('Failed to delete activity.');
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
      <h2>All Activities</h2>
      <ul className="activities-list">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-item">
            <div>
              <strong>{activity.description}</strong>
              <p>
                Start: {new Date(activity.startTime).toLocaleString()}, End: {new Date(activity.endTime).toLocaleString()}
              </p>
              <p>Access Code: <strong>{activity.accessCode}</strong></p>
            </div>
            <div>
              <button
                className="view-feedback-button"
                onClick={() => fetchFeedback(activity)}
              >
                View Feedback
              </button>
              <button
                className="delete-activity-button"
                onClick={() => deleteActivity(activity.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedActivity && (
        <div className="feedback-section">
          <h2>Feedback for "{selectedActivity.description}"</h2>
          <ul>
            {feedback.map((item) => (
              <li key={item.id} className="feedback-item">
                <p>
                  <strong>{item.emotion}</strong> at {new Date(item.createdAt).toLocaleTimeString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ProfessorPage;

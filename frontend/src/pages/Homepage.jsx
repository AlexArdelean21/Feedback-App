import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="split left" onClick={() => navigate('/professor')}>
        <h2>Professor</h2>
      </div>
      <div className="split right" onClick={() => navigate('/student')}>
        <h2>Student</h2>
      </div>
      <div className="center-question">
        <h1>Are you a professor or a student?</h1>
      </div>
    </div>
  );
};

export default Homepage;
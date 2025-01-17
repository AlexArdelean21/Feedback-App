import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProfessorPage from './pages/ProfessorPage';
import StudentPage from './pages/StudentPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/professor" element={<ProfessorPage />} />
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  );
};

export default App;
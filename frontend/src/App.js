import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage';
import CollegePage from './components/CollegePage';
import AssignmentForm from './components/AssignmentForm';
import AssignmentsList from './components/AssignmentsList';
import ApplyForm from './components/ApplyForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/college/:collegeId" element={<CollegePage />} />
          <Route path="/college/:collegeId/addassignment" element={<AssignmentForm />} />
          <Route path="/assignments" element={<AssignmentsList />} />
          <Route path="/apply-form" element={<ApplyForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import CollegePage from './components/CollegePage';
import AssignmentForm from './components/AssignmentForm';
import AssignmentsList from './components/AssignmentsList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/college" element={<CollegePage />} />
          <Route path="/assignment-form" element={<AssignmentForm />} />
          <Route path="/assignments" element={<AssignmentsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
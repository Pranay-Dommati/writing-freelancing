import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage';
import CollegePage from './components/CollegePage';
import AssignmentForm from './components/AssignmentForm';
import AssignmentsList from './components/AssignmentsList';
import ApplyForm from './components/ApplyForm';
import AboutPage from './components/AboutPage';
import FeedbackForm from './components/FeedbackForm';
import ConfirmApplication from './components/ConfirmApplication';
import TermsAndConditions from './components/TermsAndConditions';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/college/:collegeId" element={<CollegePage />} />
            <Route path="/college/:collegeId/addassignment" element={<AssignmentForm />} />
            <Route path="/assignments" element={<AssignmentsList />} />
            <Route path="/college/:collegeId/assignments/:assignmentId/apply" element={<ApplyForm />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/confirm-application/:token" element={<ConfirmApplication />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
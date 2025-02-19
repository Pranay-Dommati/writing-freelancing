// filepath: frontend/src/App.js
import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import CollegePage from './components/CollegePage';

function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      <CollegePage />
    </div>
  );
}

export default App;
import React from 'react';
import SearchBar from './SearchBar';
import '../styles/landing-page.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Freelance-Writing</h1>
      <SearchBar />
    </div>
  );
};

export default LandingPage;
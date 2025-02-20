import React from 'react';
import SearchBar from './SearchBar';
import NavigationBar from './Navbar';
import '../styles/landing-page.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <NavigationBar />
      <SearchBar />
    </div>
  );
};

export default LandingPage;
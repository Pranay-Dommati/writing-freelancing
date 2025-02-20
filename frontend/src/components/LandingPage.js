import React from 'react';
import SearchBar from './SearchBar';
import NavigationBar from './Navbar';
import homeImage from '../images/homepage_image.png'; // Add this import
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
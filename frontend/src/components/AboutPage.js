import React from 'react';
import '../styles/about-page.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Writing-Freelancing</h1>
      <div className="about-content">
        <p>
          Writing-Freelancing is a platform that connects college students who need
          writing assistance with fellow students who can help them with their writing tasks.
        </p>
        <h2>How it works</h2>
        <ul>
          <li>Students can post writing assignments they need help with</li>
          <li>Other students can apply to help with these assignments</li>
          <li>Connect directly through preferred contact method</li>
          <li>Complete the writing work and get paid</li>
        </ul>
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a collaborative environment where students can
          help each other succeed while earning money through their writing skills.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
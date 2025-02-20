import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/breadcrumb.css';

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-link">Home</Link>
      <span className="breadcrumb-separator">/</span>
      <Link to="/about" className="breadcrumb-link">About</Link>
    </nav>
  );
};

export default Breadcrumb;
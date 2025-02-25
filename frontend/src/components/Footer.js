import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="copyright">
          © {currentYear} FreelanceWriting | <Link to="/terms-and-conditions" className="text-black no-underline hover:underline">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

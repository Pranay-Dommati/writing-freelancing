import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="copyright">
        © {currentYear} FreelanceWriting
        </div>
      </div>
    </footer>
  );
};

export default Footer;

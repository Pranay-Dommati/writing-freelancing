import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleBrandClick = () => {
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      bg="light" 
      expand={false} 
      className={`navbar-fixed ${!visible ? 'nav-hidden' : ''}`}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Brand 
          className="mx-auto" 
          onClick={handleBrandClick} 
          style={{ cursor: 'pointer' }}
        >
          FreelanceWriting
        </Navbar.Brand>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link 
                as={Link} 
                to="/" 
                onClick={handleClose}
                className={isActive('/') ? 'active' : ''}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/about" 
                onClick={handleClose}
                className={isActive('/about') ? 'active' : ''}
              >
                About
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/feedback" 
                onClick={handleClose}
                className={isActive('/feedback') ? 'active' : ''}
              >
                Feedback
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
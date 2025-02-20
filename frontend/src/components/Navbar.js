import React, { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import '../styles/navbar.css';

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Add this hook

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Add this handler function
  const handleBrandClick = () => {
    navigate('/');
  };

  return (
    <Navbar bg="light" expand={false} className="navbar-fixed">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Brand 
          className="mx-auto" 
          onClick={handleBrandClick} 
          style={{ cursor: 'pointer' }} // Add cursor style
        >
          FreelanceWriting
        </Navbar.Brand>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
              <Nav.Link as={Link} to="/feedback" onClick={handleClose}>Feedback</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
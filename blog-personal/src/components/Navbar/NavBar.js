import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navibar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Link to="/" className="navbar-brand text-light">Blogverse</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className="nav-link text-light">Home</Link>
            <NavDropdown title="Blogs" id="navbarScrollingDropdown">
              <Link to="/generales" className="dropdown-item text-dark">Generales</Link>
              <Link to="/autoayuda" className="dropdown-item text-dark">Auto Ayuda</Link>
              <Link to="/politica" className="dropdown-item text-dark">Politica</Link>
              <Link to="/futbol" className="dropdown-item text-dark">Futbol</Link>
            </NavDropdown>
            <Link to="/contacto" className="nav-link text-light">Contacto</Link>
            <Link to="/crear" className="nav-link text-light">Crea tu Blog</Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;

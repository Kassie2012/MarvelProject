import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

function AppNavbar() {

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">F.o.H. Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/mutants">Mutant DB</Nav.Link>
            <Nav.Link as={NavLink} to="/submit-mutant">Add Mutant</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

function AppNavbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/mutants?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Mutant Terminal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/mutants">
              Mutant Index
            </Nav.Link>
            <Nav.Link as={Link} to="/submit-mutant">
              Submit Mutant
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="outline-light">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

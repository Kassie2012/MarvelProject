import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

function MutantIndex() {
  const [mutants, setMutants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  // Extract search query from URL
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('search')?.toLowerCase() || '';

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this character?')) return;

    fetch(`http://localhost:5000/characters/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.status === 403) {
          alert('Cannot delete official database mutants.');
          return null;
        }
        if (!res.ok) throw new Error('Failed to delete');
        return res.json();
      })
      .then((data) => {
        if (data) {
          alert('Mutant deleted successfully!');
          setMutants((prev) => prev.filter((m) => m.id !== id));
        }
      })
      .catch((error) => {
        console.error('Error deleting mutant:', error);
        alert('There was an error deleting the mutant. Please try again later.');
      });
  };

  useEffect(() => {
    setLoading(true);
    setError('');

    fetch('http://localhost:5000/characters')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch mutants');
        return res.json();
      })
      .then((data) => {
        const filtered = searchTerm
          ? data.filter(
              (mutant) =>
                mutant.name.toLowerCase().includes(searchTerm) ||
                (mutant.alias || '').toLowerCase().includes(searchTerm)
            )
          : data;
        setMutants(filtered);
      })
      .catch((err) => {
        console.error('Error loading mutants:', err);
        setError('Failed to load mutants. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  // Handle loading state
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading mutants...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4 text-light">
      <h2 className="text-success mb-4">Mutant Index</h2>
      {mutants.length === 0 ? (
        <p>
          No mutants found matching <strong>{searchTerm}</strong>
        </p>
      ) : (
        <Row>
          {mutants.map((mutant) => (
            <Col key={mutant.id} md={4} className="mb-3">
              <Card bg="dark" text="light" className="h-100 shadow">
                {mutant.image_url && (
                  <Card.Img variant="top" src={mutant.image_url} alt={mutant.name} />
                )}
                <Card.Body>
                  <Card.Title>{mutant.alias || mutant.name}</Card.Title>
                  <Card.Text>
                    <strong>Alignment:</strong> {mutant.alignment}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/mutants/${mutant.id}`}
                    variant="info"
                    size="sm"
                    className="me-2"
                  >
                    View Details
                  </Button>
                  {mutant.userCreated && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(mutant.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
export default MutantIndex;

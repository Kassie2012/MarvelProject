import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';

function CharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({
    name: '',
    alias: '',
    powers: '',
    alignment: 'Hero',
  });
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState('success');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/characters/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Character not found');
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
        setEditableData({
          name: data.name || '',
          alias: data.alias || '',
          powers: data.powers || '',
          alignment: data.alignment || 'Hero',
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    fetch(`http://localhost:5000/characters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editableData.name,
        alias: editableData.alias,
        powers: editableData.powers,
        alignment: editableData.alignment,
        image_url: character.image_url,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update');
        return res.json();
      })
      .then(() => {
        setMessage('Character updated successfully!');
        setVariant('success');
        setEditMode(false);
        setValidated(false);
        setCharacter((prev) => ({
          ...prev,
          name: editableData.name,
          alias: editableData.alias,
          powers: editableData.powers,
          alignment: editableData.alignment,
        }));
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => {
        setMessage(err.message);
        setVariant('danger');
      });
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this character?')) return;

    fetch(`http://localhost:5000/characters/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.status === 403) {
          setMessage('Cannot delete official database mutants.');
          setVariant('danger');
          return null;
        }
        if (!res.ok) throw new Error('Failed to delete');
        return res.json();
      })
      .then((data) => {
        if (data) {
          alert('Character deleted successfully!');
          navigate('/mutants');
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setVariant('danger');
      });
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading character data...</p>
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card bg="dark" text="light" className="p-4 shadow-lg" style={{ maxWidth: '700px', width: '100%' }}>
        {message && <Alert variant={variant}>{message}</Alert>}
        <Card.Img variant="top" src={character.image_url} alt={character.name} className="mb-3" />
        <Card.Body className="text-center">
          <Card.Title className="mb-3">{character.name}</Card.Title>
          {!editMode ? (
            <>
              <Card.Text><strong>Alias:</strong> {character.alias}</Card.Text>
              <Card.Text><strong>Powers:</strong> {character.powers}</Card.Text>
              <Card.Text><strong>Alignment:</strong> {character.alignment}</Card.Text>
              {character.userCreated && (
                <Button variant="danger" onClick={handleDelete} className="me-2">
                  Delete Mutant
                </Button>
              )}
              <Button variant="warning" onClick={() => setEditMode(true)}>Edit</Button>
            </>
          ) : (
            <Form noValidate validated={validated} onSubmit={handleUpdate}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={editableData.name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Alias</Form.Label>
                <Form.Control
                  name="alias"
                  value={editableData.alias}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">Please provide a valid alias.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Powers</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="powers"
                  value={editableData.powers}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">Please provide valid powers.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Alignment</Form.Label>
                <Form.Select
                  name="alignment"
                  value={editableData.alignment}
                  onChange={handleChange}
                  required
                >
                  <option value="Hero">Hero</option>
                  <option value="Villain">Villain</option>
                  <option value="Neutral">Neutral</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select an alignment.</Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit" className="me-2">Save Changes</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
            </Form>
          )}
          <hr />
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CharacterPage;

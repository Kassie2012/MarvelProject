import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Spinner, Alert, Form } from 'react-bootstrap';

function CharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit state
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({ alias: '', powers: '', alignment: '' });
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState('success');

  useEffect(() => {
    fetch(`http://localhost:5000/characters/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Character not found');
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
        setEditableData({
          alias: data.alias || '',
          powers: data.powers || '',
          alignment: data.alignment || 'Neutral'
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/characters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editableData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update');
        return res.json();
      })
      .then(() => {
        setMessage('Character updated successfully!');
        setVariant('success');
        setEditMode(false);
        setCharacter((prev) => ({ ...prev, ...editableData }));
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

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      {message && <Alert variant={variant}>{message}</Alert>}
      <h2>{character.name}</h2>
      <img src={character.image_url} alt={character.name} className="img-fluid mb-3" />

      {!editMode ? (
        <>
          <p><strong>Alias:</strong> {character.alias}</p>
          <p><strong>Powers:</strong> {character.powers}</p>
          <p><strong>Alignment:</strong> {character.alignment}</p>
          {character.userCreated && (
            <Button variant="danger" onClick={handleDelete} className="me-2">
              Delete Mutant
            </Button>
          )}
          <Button variant="warning" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </>
      ) : (
        <>
          <Form.Group className="mb-2">
            <Form.Label>Alias</Form.Label>
            <Form.Control
              name="alias"
              value={editableData.alias}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Powers</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="powers"
              value={editableData.powers}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Alignment</Form.Label>
            <Form.Select
              name="alignment"
              value={editableData.alignment}
              onChange={handleChange}
            >
              <option value="Hero">Hero</option>
              <option value="Villain">Villain</option>
              <option value="Neutral">Neutral</option>
            </Form.Select>
          </Form.Group>

          <Button variant="success" onClick={handleUpdate} className="me-2">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </>
      )}
      <hr />
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}

export default CharacterPage;
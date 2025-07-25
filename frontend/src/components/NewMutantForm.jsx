import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

function NewMutantForm() {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    powers: '',
    alignment: 'Hero',
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    fetch('http://localhost:5000/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        alias: formData.alias,
        powers: formData.powers,
        alignment: formData.alignment,
        image_url: formData.image
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to add mutant: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setVariant('success');
        setMessage('Mutant added successfully!');
      })
      .catch((error) => {
        setVariant('danger');
        setMessage(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container p-4 mt-5 shadow-lg rounded bg-light">
      <h2 className="mb-4 text-center">Submit a New Mutant</h2>

      {message && <Alert variant={variant}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="mutantName">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="mutantAlias">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="mutantPowers">
          <Form.Label>Powers *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="powers"
            value={formData.powers}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="mutantAlignment">
          <Form.Label>Alignment</Form.Label>
          <Form.Select
            name="alignment"
            value={formData.alignment}
            onChange={handleChange}
          >
            <option value="Hero">Hero</option>
            <option value="Villain">Villain</option>
            <option value="Neutral">Neutral</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="mutantImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="danger" disabled={loading} className="w-100">
          {loading ? <><Spinner animation="border" size="sm" /> Submitting...</> : 'Submit Mutant'}
        </Button>
      </Form>
    </div>
  );
}

export default NewMutantForm;

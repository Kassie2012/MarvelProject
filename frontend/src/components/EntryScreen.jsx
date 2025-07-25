import { useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Fade } from 'react-bootstrap';
import { useState } from 'react';

function EntryScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showFade, setShowFade] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => setShowFade(true), 50); // triggers fade effect
    setTimeout(() => {
      navigate('/home');
    }, 3500); 
  };

  return (
    <Container className="text-center mt-5">
      <h1 className="display-3 text-danger">Top Secret</h1>
      <p className="lead text-light">Authorized Personnel Only</p>

      {!loading ? (
        <Button
          variant="outline-light"
          size="lg"
          className="mt-4"
          onClick={handleEnter}
        >
          Continue with Restricted Access
        </Button>
      ) : (
        <Fade in={showFade}>
          <div className="mt-4">
            <Spinner animation="border" variant="light" />
            <p className="text-light mt-2">Welcome, Friend of Humanity...</p>
          </div>
        </Fade>
      )}
    </Container>
  );
}

export default EntryScreen;

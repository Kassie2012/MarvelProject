import { useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Fade } from 'react-bootstrap';
import { useState } from 'react';
import foh1 from '../assets/foh1.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function EntryScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showFade, setShowFade] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => setShowFade(true), 50); // triggers fade effect
    setTimeout(() => {
      navigate('/home');
    }, 2000); 
  };

  return (
    <Container className="text-center mt-5">
      <img
        src={foh1}
        alt="Future of Humanity"
        className="img-fluid rounded"
        style={{ maxHeight: '200px', width: 'auto' }}
      />
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
            <Spinner animation="border" variant="light" role="status" />
            <p className="text-light mt-2">Welcome, Friend of Humanity...</p>
          </div>
        </Fade>
      )}
    </Container>
  );
}

export default EntryScreen;

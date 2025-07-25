import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Fade } from 'react-bootstrap';

function Home() {
  const [showFade, setShowFade]= useState(false);

  useEffect(() => {
    setShowFade(true);
  },
  []);

  return (
    <Fade in={showFade} timeout={1000}>
    <div>
      <Container className="mt-5 text-center">
        <h1 className="display-4 text-warning mb-4">Friends of Humanity Database</h1>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="bg-dark text-info p-4 rounded shadow">
              <p>
                Together, we strive for a safer, purer world—one untouched by the chaos of mutation.
                With your vigilance and loyalty, we can ensure our children grow up in a society
                built on truth, order, and strength.
              </p>
              <p className="fst-italic">
                Mutation is a threat. Peace is our mission.
                <br />
                <strong className="text-warning">
                  Join the movement. Keep those you love safe. REPORT A MUTANT TODAY!!!
                </strong>
              </p>
            </div>
  
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button as={Link} to="/mutants" variant="outline-warning" size="lg">
                Mutant Index
              </Button>
              <Button as={Link} to="/submit-mutant" variant="outline-warning" size="lg">
                Submit a Mutant
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Fade>
  );
}

export default Home;

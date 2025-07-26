import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <Container className="text-center mt-5">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
        </Container>
    );
}

import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-3 text-danger glitch">404</h1>
            <p className="lead text-light">Access Denied</p>
            <p className="text-light">The page you are looking for does not exist.</p>
            <p className="text-muted">Please return to the <Link to="/home" className="text-success">Main Terminal</Link>.</p>
        </div>

    );
}
export default ErrorPage;
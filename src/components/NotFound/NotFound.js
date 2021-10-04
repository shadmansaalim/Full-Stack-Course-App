import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import img from '../../images/404.svg'

const NotFound = () => {
    const history = useHistory();
    return (
        <Container style={{ marginTop: 120, marginBottom: 120 }}>
            <div>
                <div className="col-6 mx-auto">
                    <img className="img-fluid" src={img} alt="" />
                </div>
                <h2 className="mt-2">Page Not Found</h2>
                <p>We are sorry, the page you requested could not be found. Please go back to the homepage.</p>
                <Button onClick={() => history.push('/home')} variant="outline-primary me-3">Home <FontAwesomeIcon icon={faHome} /></Button>
            </div>
        </Container>
    );
};

export default NotFound;
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import img from '../../images/empty.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const MyClasses = () => {
    // History Api
    const history = useHistory();
    return (
        // MyClasses Page used React FontAwesome for Good UI/UX
        <section className="text-center mt-5">
            <Container>
                <Row>
                    <Col lg="6" className="mx-auto shadow-lg mb-5 p-5">
                        <img className="img-fluid mb-3 col-6" src={img} alt="" />
                        <h3>No Courses Added</h3>
                        <p>You have not added any course to your class. Please go back to home or courses and add a course to continue learning.</p>
                        {/* Navigating the user back to homepage */}
                        <Button onClick={() => history.push('/home')} variant="outline-primary me-3">Home <FontAwesomeIcon icon={faHome} /></Button>
                        {/* Navigating the user to courses page so that user can add course */}
                        <Button onClick={() => history.push('/courses')} variant="outline-primary">Courses <FontAwesomeIcon icon={faAngleDoubleRight} /></Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MyClasses;
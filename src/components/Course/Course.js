import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import Rating from 'react-rating';
import './Course.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const Course = (props) => {
    // Destructuring data from props
    const { name, img, instructor, rating, peopleRated, previousPrice, discountedPrice, courseID } = props.course;
    const history = useHistory();

    const goToCourseDetails = () => {
        history.push(`/course/${courseID}`)
    }
    return (
        <Col>
            {/* Creating card to display */}
            <Card className="h-100">
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <small>{instructor}</small>
                        <div className="d-flex justify-content-center mt-1">
                            <span className="me-1 rating">{rating}</span>
                            {/* Giving the rating dynamically using react rating */}
                            <Rating
                                className="me-1"
                                initialRating={rating}
                                emptySymbol="far fa-star icon-color"
                                fullSymbol="fas fa-star icon-color"
                                readonly
                            ></Rating>
                            <small>({peopleRated})</small>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <h5 className="fw-bold">${discountedPrice}</h5>
                            {
                                previousPrice ? <p className="text-muted ms-1 text-decoration-line-through">${previousPrice}</p> : null
                            }
                        </div>

                    </Card.Text>
                </Card.Body>
                {/* Adding a button to add class */}
                <Card.Footer>
                    <Button onClick={goToCourseDetails} variant="primary">Preview Course <FontAwesomeIcon icon={faAngleDoubleRight} /></Button>
                </Card.Footer>
            </Card></Col>
    );
};

export default Course;
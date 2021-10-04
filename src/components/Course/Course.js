import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import Rating from 'react-rating';
import './Course.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Course = (props) => {
    const { name, img, instructor, rating, peopleRated, previousPrice, discountedPrice } = props.course;
    return (
        <Col>
            <Card className="h-100">
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <small>{instructor}</small>
                        <div className="d-flex justify-content-center mt-1">
                            <span className="me-1 rating">{rating}</span>
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
                <Card.Footer>
                    <Button variant="primary">Add to Class <FontAwesomeIcon icon={faPlusCircle} /></Button>
                </Card.Footer>
            </Card></Col>
    );
};

export default Course;
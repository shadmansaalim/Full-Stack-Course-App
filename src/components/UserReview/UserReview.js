import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import Rating from 'react-rating';
import './UserReview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const UserReview = ({ review }) => {
    return (

        <Col>
            <Card style={{ minHeight: '300px', maxHeight: '300px', overflow: 'scroll' }} className="mx-3 text-dark">
                <Card.Body>
                    <div className="d-flex align-items-center text-start">
                        {
                            review.photoURL
                                ?
                                <img className="img-fluid rounded-circle" src={review.photoURL} alt="" style={{ width: 48, height: 48 }}></img>
                                :
                                <FontAwesomeIcon className="text-secondary" icon={faUserCircle} style={{ width: 48, height: 48 }} />

                        }
                        <Card.Title className="ms-3">
                            <small className="m-0">{review.name}</small>
                            <br />
                            <Rating
                                className="me-1"
                                initialRating={review.rating}
                                emptySymbol="far fa-star icon-color"
                                fullSymbol="fas fa-star icon-color"
                                readonly
                            ></Rating>
                        </Card.Title>
                    </div>
                    <hr />
                    <Card.Text>
                        {review.feedback}
                    </Card.Text>
                </Card.Body>
            </Card></Col>



    );
};

export default UserReview;


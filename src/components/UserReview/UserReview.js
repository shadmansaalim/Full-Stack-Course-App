import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Rating from 'react-rating';
import './UserReview.css';

const UserReview = ({ review }) => {
    return (
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded">
                        <div class="blockquote-custom-icon bg-primary shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                        <p class="mb-0 mt-2 font-italic text-muted">{review.feedback}</p>
                        <footer class="pt-4 mt-4 border-top d-flex align-items-center">
                            <img className="img-fluid rounded-circle" src={review.photoURL} alt="User" style={{ width: 48, height: 48 }}></img>
                            <div className="ms-3">
                                <small className="m-0">{review.name}</small>
                                <br />
                                <Rating
                                    className="me-1"
                                    initialRating={review.rating}
                                    emptySymbol="far fa-star icon-color"
                                    fullSymbol="fas fa-star icon-color"
                                    readonly
                                ></Rating>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>

    );
};

export default UserReview;


<div class="mx-auto text-start px-3 py-5">

</div>
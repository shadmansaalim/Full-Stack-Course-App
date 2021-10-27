import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating';

const ReviewItem = (props) => {
    const { name, discountedPrice, courseID, img, instructor, rating, peopleRated, previousPrice } = props.course;
    return (
        <div style={{ borderBottom: '1px solid lightgray' }} className="d-flex
        flex-column flex-lg-row me-2 text-dark p-2 rounded-3 mb-1 justify-content-around align-items-center">
            <div>
                <img className="img-fluid rounded-3" src={img} alt="" style={{ height: 130 }} />
            </div>
            <div style={{ width: '70%' }} className="mt-2 mt-lg-0 d-flex d-md-block flex-column justify-content-center">
                <h6 className="m-0">{name}</h6>
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
                <button onClick={() => props.handleRemove(courseID)} className="btn btn-outline-danger">Remove <FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    );
};

export default ReviewItem;
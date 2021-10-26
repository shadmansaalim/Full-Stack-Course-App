import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = (props) => {
    const { name, discountedPrice, _id, img } = props.course;
    return (
        <div style={{ borderBottom: '1px solid lightgray' }} className="d-flex
        flex-column flex-lg-row me-2 text-dark p-2 rounded-3 mb-1 justify-content-around align-items-center">
            <div>
                <img className="img-fluid rounded-3" src={img} alt="" style={{ height: 130 }} />
            </div>
            <div style={{ width: '70%' }} className="d-flex d-md-block flex-column justify-content-center">
                <h6>{name}</h6>
                <p><b>Price</b> : ${discountedPrice}</p>
                <button onClick={() => props.handleRemove(_id)} className="btn btn-outline-danger">Remove <FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    );
};

export default ReviewItem;
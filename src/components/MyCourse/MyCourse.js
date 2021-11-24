import React from 'react';
import swal from 'sweetalert';
import cooking from '../../images/cooking.gif';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Modal, Button } from 'react-bootstrap';
const MyCourse = ({ course }) => {
    const [firstModalShow, setFirstModalShow] = useState(false);
    const [secondModalShow, setSecondModalShow] = useState(false);

    const handleFirstModalClose = () => setFirstModalShow(false);
    const handleFirstModalShow = () => setFirstModalShow(true);

    const handleSecondModalClose = () => setSecondModalShow(false);
    const handleSecondModalShow = () => setSecondModalShow(true);

    const { img, _id, instructor, name, } = course;
    const { user } = useAuth();
    const [value, setValue] = useState(0);
    const [reviewData, setReviewData] = useState({ name: user?.displayName, feedback: "" });


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newReviewData = { ...reviewData };
        newReviewData[field] = value;
        setReviewData(newReviewData);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        reviewData.photoURL = user.photoURL;
        reviewData.rating = value;
        fetch(`http://localhost:5000/reviews/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if ((result.modifiedCount > 0) || result.insertedId || result.upsertedId) {
                    swal("Thank you for your feedback", "We have added your feedback on our course details page", "success");
                    handleFirstModalClose();
                    handleSecondModalClose();
                    e.target.reset();
                }
            })


    }
    return (
        <div className="col">
            <div className="card h-100">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body course d-flex flex-column justify-content-around">
                    <p className="card-title fw-bold">{name}</p>
                    <div className="card-text">
                        <small>{instructor}</small>
                        <br />
                        <div className="progress col-10 mx-auto mt-2">
                            <div className="progress-bar " role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>

                        <Modal show={firstModalShow} onHide={handleFirstModalClose}>
                            <Modal.Header closeButton>
                                <h6>{name}</h6>
                            </Modal.Header>
                            <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                                <img src={cooking} alt="" className="img-fluid" />
                                <p className="mb-1 fw-bold">Course Module Not Cooked Yet</p>
                                <small>Pro Tips: You can do some practice until the new module is released.</small>
                            </Modal.Body>
                            <Modal.Footer>
                                <button class="btn btn-primary" onClick={() => {
                                    handleFirstModalClose()
                                    handleSecondModalShow()
                                }}
                                ><FontAwesomeIcon icon={faPen} /> Add Review</button>
                            </Modal.Footer>
                        </Modal>



                        <Modal show={secondModalShow} onHide={handleSecondModalClose}>
                            <form onSubmit={handleSubmit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Drop a review about this course</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Please enter your feedback here</p>
                                    <div className="form-floating mb-3">
                                        <input defaultValue={user?.displayName} className="form-control" id="floatingServiceName" required
                                            type="text" name="name"
                                            onBlur={handleOnBlur}
                                        />
                                        <label htmlFor="floatingServiceName"><small>Your Name</small></label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingServiceDescription" style={{ height: '100px' }}
                                            type="text" name="feedback"
                                            onBlur={handleOnBlur}
                                        ></textarea>
                                        <label htmlFor="floatingServiceDescription">Feedback</label>
                                    </div>
                                    <div className="text-start">
                                        <Rating
                                            className="fs-3"
                                            emptySymbol="far fa-star icon-color"
                                            fullSymbol="fas fa-star icon-color"
                                            fractions={2}
                                            value={value}
                                            onChange={(value) => {
                                                setValue(value);
                                            }}
                                        ></Rating>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-primary" type="submit">Submit</button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                </div>
                <div className="card-footer">
                    <button class="btn btn-outline-dark rounded-pill" onClick={handleFirstModalShow}>Continue Course</button>
                </div>
            </div>
        </div>
    );
};

export default MyCourse;
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import img from '../../images/empty.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleDoubleRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import './MyClasses.css'
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth'
import { useState } from 'react';
import swal from 'sweetalert';
import cooking from '../../images/cooking.gif';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';


const MyClasses = () => {

    const { user } = useAuth();
    const [myCourses, setMyCourses] = useState([])
    const history = useHistory();


    //Secured user classes details API by using firebase token and keeping it in local storage

    useEffect(() => {
        fetch(`http://localhost:5000/myClasses?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('courseIdToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    swal("Unauthorized User!", "Please Login and Try Again Later", "warning");
                    history.push('/login');
                }
            })
            .then(result => {
                setMyCourses(result);
            })

    }, [])


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [value, setValue] = useState(0);

    const onSubmit = (data, id) => {
        data.photoURL = user.photoURL;
        data.rating = value;
        fetch(`http://localhost:5000/reviews/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    swal("Thank you for your feedback", "We have added your feedback on our landing page", "success");
                    reset();
                }
            })

    }




    return (
        // MyClasses Page used React FontAwesome for Good UI/UX
        <section className="text-center">
            <Container>
                {
                    myCourses.length
                        ?

                        <section style={{ marginBottom: '150px' }}>
                            <div className="my-5">
                                <h3 className="fw-light mb-5">Welcome back <span className="fw-normal">{user.displayName}</span>, ready for your next lesson?</h3>
                                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                                    {
                                        myCourses.map(course => {

                                            return (
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <img src={course.img} className="card-img-top" alt="..." />
                                                        <div className="card-body course">
                                                            <p className="card-title fw-bold">{course.name}</p>
                                                            <div className="card-text">
                                                                <small>{course.instructor}</small>
                                                                <br />
                                                                <div className="progress col-10 mx-auto mt-2">
                                                                    <div className="progress-bar " role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                                                </div>


                                                                <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                                                    <div class="modal-dialog modal-dialog-centered">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <p class="modal-title" id="exampleModalLabel">{course.name} </p>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <img src={cooking} alt="" />
                                                                                <p className="mb-1 fw-bold">Course Module Not Cooked Yet</p>
                                                                                <small>Pro Tips: You can do some practice until the new module is released.</small>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"><FontAwesomeIcon icon={faPen} /> Add Review</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Add Review Modal */}
                                                                <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                                                                    <div class="modal-dialog modal-dialog-centered">
                                                                        <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                                                                            <div class="modal-header">
                                                                                <h5 class="modal-title" id="exampleModalToggleLabel2">Drop a review about this course</h5>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <div className="card-body my-4">
                                                                                    <p>Please enter your feedback here</p>
                                                                                    <div className="form-floating mb-3">
                                                                                        <input defaultValue={user?.displayName} type="text" className="form-control" id="floatingServiceName" placeholder="name@example.com" required  {...register("name")} />
                                                                                        <label htmlFor="floatingServiceName"><small>Your Name</small></label>
                                                                                    </div>
                                                                                    <div class="form-floating mb-3">
                                                                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingServiceDescription" style={{ height: '100px' }} {...register("feedback")}></textarea>
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



                                                                                </div>

                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button class="btn btn-primary" type="submit">Submit</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <a class="btn btn-outline-dark rounded-pill mt-3" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Continue Course</a>




                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                        </section>
                        :
                        <>
                            {
                                myCourses === 0
                                    ?
                                    <Row style={{ marginTop: '80px', marginBottom: '80px' }}>
                                        <Col lg="6" className="mx-auto shadow-lg mb-5 p-5 rounded-3">
                                            <img className="img-fluid mb-3 col-6" src={img} alt="" />
                                            <h3>No Courses Added</h3>
                                            <p>You have not added any course to your class. Please go back to home or courses and add a course to continue learning.</p>
                                            {/* Navigating the user back to homepage */}
                                            <Button onClick={() => history.push('/home')} variant="outline-primary me-3">Home <FontAwesomeIcon icon={faHome} /></Button>
                                            {/* Navigating the user to courses page so that user can add course */}
                                            <Button onClick={() => history.push('/courses')} variant="outline-primary">Courses <FontAwesomeIcon icon={faAngleDoubleRight} /></Button>
                                        </Col>
                                    </Row>
                                    :
                                    <div className="vh-100 d-flex justify-content-center align-items-center">
                                        <div className="spinner"></div>
                                    </div>
                            }
                        </>
                }
            </Container>
        </section>
    );
};

export default MyClasses;







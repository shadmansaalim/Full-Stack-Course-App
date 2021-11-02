import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import img from '../../images/empty.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import './MyClasses.css'
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth'
import { useState } from 'react';

const MyClasses = () => {

    const { user } = useAuth();
    const [myCourses, setMyCourses] = useState([])

    useEffect(() => {
        if (user.email) {
            fetch(`http://localhost:5000/myClasses?email=${user.email}`)
                .then(res => res.json())
                .then(result => {
                    setMyCourses(result);
                })

        }
    }, [])


    const history = useHistory();
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
                                                                <button className="btn btn-outline-dark rounded-pill mt-3" >Continue Course</button>
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







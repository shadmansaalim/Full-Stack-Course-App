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

import MyCourse from '../MyCourse/MyCourse';


const MyClasses = () => {
    const { user } = useAuth();
    const [myCourses, setMyCourses] = useState([])
    const history = useHistory();


    //Secured user classes details API by using firebase token and keeping it in local storage

    useEffect(() => {
        fetch(`https://course-app-backend.onrender.com/myClasses?email=${user.email}`, {
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

    }, [user.email, history])

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
                                        myCourses.map(course => <MyCourse
                                            course={course}
                                        ></MyCourse>)
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







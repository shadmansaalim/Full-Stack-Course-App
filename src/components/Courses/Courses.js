import React from 'react';
import { useState } from 'react';
import Course from '../Course/Course';
import { Row, Container } from 'react-bootstrap';
import useCourses from '../../hooks/useCourses';

import { Spinner } from 'react-bootstrap';

const Courses = () => {
    const [courses, setCourses, pageCount, activePage, setActivePage] = useCourses();


    return (
        <Container className="mt-5">
            <h5 className="fw-bold">Check out amazing courses by Top Instructors</h5>
            {
                courses.length ?
                    <section>
                        <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
                            {
                                //Mapping over courses and passing the course to Course component to create card
                                courses.map(course => <Course
                                    key={course.name}
                                    course={course}
                                ></Course>)
                            }
                        </Row>
                        <div className="d-flex justify-content-end">
                            <nav aria-label="...">
                                <ul className="pagination">
                                    {
                                        // <li className={activePage !== 1 ? 'page-item' : 'page-item disabled'}>
                                        //     <button
                                        //         onClick={setActivePage(activePage - 1)}
                                        //         className="page-link">Previous
                                        //     </button>
                                        // </li>


                                    }
                                    {

                                        [...Array(pageCount).keys()].map(number => <li key={number}
                                            //Giving class name using conditional rendering to highlight the active page
                                            className={number === activePage ? 'page-item active' : 'page-item'}>
                                            <button
                                                onClick={() => setActivePage(number)}
                                                className="page-link" >
                                                {number + 1}
                                            </button>
                                        </li>)
                                    }
                                    {
                                        // activePage !== (pageNumbers.length) ?
                                        //     <li className="page-item">
                                        //         <a href="#" onClick={() => {
                                        //             paginate(activePage + 1)
                                        //             setActivePage(activePage + 1)
                                        //         }} className="page-link">Next</a>
                                        //     </li>
                                        //     :
                                        //     <li className="page-item disabled">
                                        //         <a href="#" className="page-link">Next</a>
                                        //     </li>
                                    }
                                </ul>
                            </nav>
                        </div>
                    </section>
                    :
                    <div className="vh-100 d-flex flex-column align-items-center mx-auto text-dark" style={{ marginTop: 150 }}>
                        <h3 className="text-muted">Loading...</h3>
                        <Spinner animation="grow" />

                    </div>
            }
        </Container>
    );
};

export default Courses;
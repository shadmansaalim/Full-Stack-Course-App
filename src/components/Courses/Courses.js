import React from 'react';
import Course from '../Course/Course';
import { Row, Container } from 'react-bootstrap';
import useCourses from '../../hooks/useCourses';
import './Courses.css'
import { useState } from 'react';
import { useEffect } from 'react';

const Courses = () => {
    const [courses, setCourses, pageCount, activePage, setActivePage] = useCourses();

    const [countdownDay, setCountdownDay] = useState(0);
    const [countdownHour, setCountdownHour] = useState(0);
    const [countdownMinute, setCountdownMinute] = useState(0);
    const [countdownSecond, setCountdownSecond] = useState(0);

    const countdown = () => {
        const countDate = new Date('Feb 29, 2022 00:00:00').getTime();
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        setCountdownDay(textDay)
        const textHour = Math.floor((gap % day) / hour);
        setCountdownHour(textHour);
        const textMinute = Math.floor((gap % hour) / minute);
        setCountdownMinute(textMinute);
        const textSecond = Math.floor((gap % minute) / second);
        setCountdownSecond(textSecond);
    }

    useEffect(() => {
        setInterval(countdown, 1000);
    }, [])

    return (
        <Container>
            {
                courses.length
                    ?
                    <section className="mt-5">
                        <h5>Check out Amazing Courses <small className="fw-light">(Up To 60% Off Udemy Discount)</small></h5>

                        <div className="mt-2 d-flex justify-content-around col-md-6 col-lg-5 mx-auto">
                            {/* <Countdown date={Date.now() + 10000000000} /> */}
                            <div className="mx-auto">
                                <div className="d-flex justify-content-center">
                                    <div className="bg-dark text-white p-2 p-lg-3 rounded-3">
                                        <h4 className="m-0"><strong>{parseInt(countdownDay / 10)}</strong></h4>
                                    </div>
                                    <div className="ms-1 bg-dark text-white p-2 p-lg-3  rounded-3">
                                        <h4 className="m-0"><strong>        {parseInt(countdownDay % 10)}</strong></h4>
                                    </div>
                                </div>
                                <p>Days</p>
                            </div>
                            <div className="mx-auto">
                                <div className="d-flex justify-content-center">
                                    <div className="bg-dark text-white p-2 p-lg-3  rounded-3">
                                        <h4 className="m-0"><strong>{parseInt(countdownHour / 10)}</strong></h4>
                                    </div>
                                    <div className="ms-1 bg-dark text-white p-2 p-lg-3  rounded-3">
                                        <h4 className="m-0"><strong>        {parseInt(countdownHour % 10)}</strong></h4>
                                    </div>
                                </div>
                                <p>Hours</p>
                            </div>
                            <div className="mx-auto">
                                <div className="d-flex justify-content-center">
                                    <div className="bg-dark text-white p-2 p-lg-3  rounded-3">
                                        <h4 className="m-0"><strong>{parseInt(countdownMinute / 10)}</strong></h4>
                                    </div>
                                    <div className="ms-1 bg-dark text-white p-2 p-lg-3  rounded-3">
                                        <h4 className="m-0"><strong>        {parseInt(countdownMinute % 10)}</strong></h4>
                                    </div>
                                </div>
                                <p>Minutes</p>
                            </div>
                            <div className="mx-auto">
                                <div className="d-flex justify-content-center">
                                    <div className="bg-dark text-white p-2 p-lg-3  rounded-3">
                                        <h4 className="m-0"><strong>{parseInt(countdownSecond / 10)}</strong></h4>
                                    </div>
                                    <div className="ms-1 bg-dark text-white p-2 p-lg-3  rounded-3">
                                        <h4 className="m-0"><strong>        {parseInt(countdownSecond % 10)}</strong></h4>
                                    </div>
                                </div>
                                <p>Seconds</p>
                            </div>


                        </div>

                        <div>
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
                                            <li className={activePage === 0 ? 'page-item disabled' : 'page-item'}>
                                                <button onClick={() => setActivePage(activePage - 1)} className="page-link" aria-label="Previous">
                                                    Previous
                                                </button>
                                            </li>


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
                                            <li className={activePage === pageCount - 1 ? 'page-item disabled' : 'page-item'}>
                                                <button onClick={() => setActivePage(activePage + 1)} className="page-link" aria-label="Next">
                                                    Next
                                                </button>
                                            </li>
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </section>
                    :
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                        <div className="spinner"></div>
                    </div>
            }
        </Container>
    );
};

export default Courses;
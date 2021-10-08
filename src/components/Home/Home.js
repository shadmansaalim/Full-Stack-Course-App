import React from 'react';
import Introduction from '../Introduction/Introduction';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import Course from '../Course/Course';
import { Row, Col, Accordion } from 'react-bootstrap';
import './Home.css'
import { useContext } from 'react';
import { UserDetailsContext } from '../../App';




const Home = () => {
    // User Data From Context API
    const [user] = useContext(UserDetailsContext);


    //Declaring the state for courses 
    const [courses, setCourses] = useState([]);
    //Fetching data from JSON File kept in Public Folder
    useEffect(() => {
        fetch('./courseData.JSON')
            .then(res => res.json())
            .then(data => setCourses(data))

    }, []);


    //Filtering courses to only show 6 courses in the Home Page
    const displayCourses = courses.filter(course => courses.indexOf(course) < 4);
    return (
        <Container className="mb-5">
            <Introduction></Introduction>
            <section className="mx-lg-5 mb-5" style={{ marginTop: 120 }}>
                <h1 className="headline mb-5 text-start">Explore Top Courses</h1>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {
                        //Mapping over the displayCourses array and calling the Course component which creates card
                        displayCourses.map(course => <Course
                            key={course.name}
                            course={course}
                        ></Course>)
                    }
                </Row>
            </section>
            {/* Added a Accordion using React Bootstrap for better UI/UX */}
            <section style={{ marginTop: 120 }}>
                <h1 className="headline mb-3 text-start ms-lg-4">Why Udemy?</h1>
                <Row className="d-flex justfiy-content-around align-items-center">
                    <Col lg={6} className="mx-auto">
                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Resources</Accordion.Header>
                                <Accordion.Body>
                                    Whenever you learn, you want to have access to as many resources as possible, and Udemy ensures that. Students can complete exercises and assignments and submit them to instructors to get their opinion on how they have performed
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Low Prices</Accordion.Header>
                                <Accordion.Body>
                                    Low prices (typically $10-$15) offer equal access to education
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Lifetime Access</Accordion.Header>
                                <Accordion.Body>
                                    Lifetime access to course content (the $10-$15 fee is one-off, and students are not billed every month)
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Top Instructors</Accordion.Header>
                                <Accordion.Body>
                                    There is a great number of instructors who compete to create quality content (otherwise the marketplace’s rating system would penalize them, and they would not succeed)
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Trendy Topics</Accordion.Header>
                                <Accordion.Body>
                                    Competition creates a very dynamic environment in course creation, and trendy topics are covered on Udemy much faster compared to other platforms.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col lg={5} className="mx-auto">
                        <img className="img-fluid" src="https://s.udemycdn.com/home/non-student-cta/instructor-2x-v3.jpg" alt="" />
                    </Col>
                </Row>
            </section>

        </Container>
    );
};

export default Home;
import React from 'react';
import Introduction from '../Introduction/Introduction';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import Course from '../Course/Course';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('./courseData.JSON')
            .then(res => res.json())
            .then(data => setCourses(data))

    }, []);
    const displayCourses = courses.filter(course => courses.indexOf(course) < 6);
    return (
        <Container>
            <Introduction></Introduction>
            <section style={{ marginTop: 120 }}>
                <h2 className="mb-4">Featured Courses</h2>
                <Row xs={1} lg={3} className="g-4">
                    {
                        displayCourses.map(course => <Course
                            key={course.name}
                            course={course}
                        ></Course>)
                    }
                </Row>
            </section>
        </Container>
    );
};

export default Home;
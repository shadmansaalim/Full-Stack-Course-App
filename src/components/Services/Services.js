import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Course from '../Course/Course';
import { Row, Container } from 'react-bootstrap';

const Services = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('./courseData.JSON')
            .then(res => res.json())
            .then(data => setCourses(data))

    }, []);

    return (
        <Container>
            <Row xs={1} lg={4} className="g-4 my-5">
                {
                    courses.map(course => <Course
                        key={course.name}
                        course={course}
                    ></Course>)
                }
            </Row>
        </Container>
    );
};

export default Services;
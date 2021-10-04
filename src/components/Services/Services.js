import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Course from '../Course/Course';
import { Row, Container } from 'react-bootstrap';

const Services = () => {
    // Declaring the state
    const [courses, setCourses] = useState([]);
    // fetching data from JSON file
    useEffect(() => {
        fetch('./courseData.JSON')
            .then(res => res.json())
            .then(data => setCourses(data))

    }, []);

    return (
        <Container>
            <Row xs={1} lg={4} className="g-4 my-5">
                {
                    //Maping over courses and passing the course to Course component to create card
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
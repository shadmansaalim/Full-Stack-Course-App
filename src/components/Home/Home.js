import React from 'react';
import Introduction from '../Introduction/Introduction';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('./courseData.JSON')
            .then(res => res.json())
            .then(data => setCourses(data))

    }, []);
    const displayCourses = courses.filter(course => courses.indexOf(course) < 4);
    console.log(displayCourses);
    return (
        <Container>
            <Introduction></Introduction>
            <section className="my-5">
                <h2>Services</h2>
                {

                }
            </section>
        </Container>
    );
};

export default Home;
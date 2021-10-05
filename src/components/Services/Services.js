import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Course from '../Course/Course';
import { Row, Container } from 'react-bootstrap';
import CoursePagination from '../CoursePagination/CoursePagination';



const Services = () => {
    // Declaring the state
    const [courses, setCourses] = useState([]);
    //Declaring states for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage, setCoursesPerPage] = useState(8);


    // fetching data from JSON file
    useEffect(() => {
        fetch('./courseData.JSON')
            .then(res => res.json())
            .then(data => setCourses(data))

    }, []);


    // Getting index of last course in the page 
    const indexOfLastCourse = currentPage * coursesPerPage;
    // Getting index of fist course in the page (Not giving 0 cause in another page first course index will not be 0) 
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    //Finding the current courses to view on the page
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)


    //Change Page by setting the current page state
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <Container>
            <h5 className="fw-bold">Check out amazing courses by Top Instructors</h5>
            <section>
                <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
                    {
                        //Maping over courses and passing the course to Course component to create card
                        currentCourses.map(course => <Course
                            key={course.name}
                            course={course}
                        ></Course>)
                    }
                </Row>
                <div className="d-flex justify-content-end">
                    {/* Calling the course pagination component for pagination */}
                    <CoursePagination
                        coursesPerPage={coursesPerPage}
                        totalCourses={courses.length}
                        paginate={paginate}
                    ></CoursePagination>
                </div>
            </section>
        </Container>
    );
};

export default Services;
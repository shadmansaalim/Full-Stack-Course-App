import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { useEffect } from 'react';
import useCourses from '../../hooks/useCourses';
import { useState } from 'react';
import { Container } from 'react-bootstrap';


const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const history = useHistory();

    // Fetching single course from Database 
    useEffect(() => {
        const url = `http://localhost:5000/course/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCourse(data))
    }, []);

    const opts = {
        height: '250',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };


    const goToBuyCourse = () => {
        history.push((`/course/${id}/buy-course`))
    }

    return (
        <div className="bg-dark text-white py-5">
            <Container>
                {
                    course && <section>
                        <section className="row mb-5 d-flex mt-lg-4">
                            <div className="col-lg-6 col-xl-5 mx-auto">
                                <div
                                    className="video"
                                    style={{
                                        position: "relative",
                                        paddingBottom: "56.25%" /* 16:9 */,
                                        paddingTop: 25,
                                        height: 0
                                    }}
                                >
                                    <iframe
                                        title={course.name}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        src={`https://www.youtube.com/embed/${course.video}`}
                                        frameBorder="0"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-5 col-xl-6 mx-auto text-start mt-3 mt-lg-0">
                                <h3>{course.name}</h3>
                                <p className="mb-2">{course.tagline}</p>
                                <small>
                                    <b>4.5</b>
                                    <Rating
                                        className="mx-1"
                                        initialRating={course.rating}
                                        emptySymbol="far fa-star icon-color"
                                        fullSymbol="fas fa-star icon-color"
                                        readonly
                                    ></Rating>
                                    ({course.peopleRated})
                                </small>
                                <br />
                                <small>Created by <a href="!#">{course.instructor}</a></small>
                                <br />
                                <button onClick={goToBuyCourse} className="btn text-white mt-3" style={{ backgroundColor: 'rgb(69, 82, 110)' }}>Buy Course</button>
                            </div>

                        </section>
                        <section className="col-lg-9 mb-4 mx-auto">
                            <h3 className="text-start mb-3 fw-light">Description</h3>
                            <p className="text-start">
                                {course.description}
                            </p>
                            <div className="mt-4 mt-md-5 mb-4 row d-flex align-items-center justify-content-center col-xl-8 mx-auto">
                                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                                    <h5>{course.lectures}</h5>
                                    <small>Lectures</small>
                                </div>
                                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                                    <h5>{course.students}</h5>
                                    <small>Students</small>
                                </div>
                                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto">
                                    <h5>{course.projects}</h5>
                                    <small>Projects</small>
                                </div>
                            </div>
                        </section>



                    </section>
                }
            </Container>
        </div>
    );
};

export default CourseDetails;
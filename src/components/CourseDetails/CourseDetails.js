import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { useEffect } from 'react';
import useCourses from '../../hooks/useCourses';
import { useState } from 'react';
import { Container } from 'react-bootstrap';


const CourseDetails = () => {
    const { courseID } = useParams();
    // Getting courses from custom hook
    const [courses] = useCourses();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const history = useHistory();
    // const [videoID, setVideoID] = useState('');


    //Setting the selected course every time by comparing with the courseID and also giving a dependency courses so that whenever courses changes selectedCourse also gets updated.
    useEffect(() => {
        setSelectedCourse(courses.find(c => parseInt(c.courseID) === parseInt(courseID)));
        // selectedCourse && setVideoID((selectedCourse?.video).substring(17));
    }, [courses]);

    const opts = {
        height: '250',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };


    const goToBuyCourse = () => {
        history.push((`/course/${courseID}/buy-course`))
    }

    return (
        <div className="bg-dark text-white py-5">
            <Container>
                {
                    selectedCourse && <section>
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
                                        title={selectedCourse.name}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        src={`https://www.youtube.com/embed/${selectedCourse.video}`}
                                        frameBorder="0"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-5 col-xl-6 mx-auto text-start mt-3 mt-lg-0">
                                <h3>{selectedCourse.name}</h3>
                                <p className="mb-2">{selectedCourse.tagline}</p>
                                <small>
                                    <b>4.5</b>
                                    <Rating
                                        className="mx-1"
                                        initialRating={selectedCourse.rating}
                                        emptySymbol="far fa-star icon-color"
                                        fullSymbol="fas fa-star icon-color"
                                        readonly
                                    ></Rating>
                                    ({selectedCourse.peopleRated})
                                </small>
                                <br />
                                <small>Created by <a href="!#">{selectedCourse.instructor}</a></small>
                                <br />
                                <button onClick={goToBuyCourse} className="btn text-white mt-3" style={{ backgroundColor: 'rgb(69, 82, 110)' }}>Buy Course</button>
                            </div>

                        </section>
                        <section className="col-lg-9 mb-4 mx-auto">
                            <h3 className="text-start mb-3 fw-light">Description</h3>
                            <p className="text-start">
                                {selectedCourse.description}
                            </p>
                            <div className="mt-4 mt-md-5 mb-4 row d-flex align-items-center justify-content-center col-xl-8 mx-auto">
                                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                                    <h5>{selectedCourse.lectures}</h5>
                                    <small>Lectures</small>
                                </div>
                                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                                    <h5>{selectedCourse.students}</h5>
                                    <small>Students</small>
                                </div>
                                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto">
                                    <h5>{selectedCourse.projects}</h5>
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
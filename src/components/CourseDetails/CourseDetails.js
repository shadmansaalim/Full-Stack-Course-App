import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons';
import { addToDb } from '../../utilities/LocalStorage';

// import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCart from '../../hooks/useCart';
import useCourses from '../../hooks/useCourses';

toast.configure()

const CourseDetails = () => {
    const { id } = useParams();
    const [courses] = useCourses();
    const [course, setCourse] = useState({});
    const [added, setAdded] = useState(false);
    const [cart, setCart] = useCart(courses);
    console.log(cart);
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


    const handleAddToCart = (course) => {
        const newCart = [...cart, course];
        setCart(newCart);
        // Saving to local storage
        addToDb(course._id);
        setAdded(true);
        toast.success('Course Added To Cart')
    }




    return (
        <div className="bg-dark text-white py-5">
            <Container>
                {
                    course.name ?
                        <section>
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
                                    <button onClick={() => handleAddToCart(course)} className={added === false ? "btn btn-secondary text-white mt-3" : "btn btn-success text-white mt-3 disabled"}>
                                        {
                                            added === true ?
                                                <p className="m-0">Added to Cart <FontAwesomeIcon icon={faCheck} /></p>
                                                :
                                                <p className="m-0">Add to Cart <FontAwesomeIcon icon={faShoppingCart} /></p>
                                        }
                                    </button>
                                </div>

                            </section>
                            <section className="col-lg-9 mb-4 mx-auto">
                                <h3 className="text-start mb-3 fw-light">Description</h3>
                                <p className="text-start">
                                    {course.description}
                                </p>
                                <div className="mt-4 mt-md-5 mb-4 row d-flex align-items-center justify-content-center col-xl-8 mx-auto">
                                    <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                                        <h5>
                                            <CountUp redraw={true} end={course.lectures} duration={2} >
                                                {({ countUpRef, start }) => (
                                                    <VisibilitySensor onChange={start} delayedCall>
                                                        <span ref={countUpRef} />
                                                    </VisibilitySensor>
                                                )}
                                            </CountUp>
                                        </h5>
                                        <small>Lectures</small>
                                    </div>
                                    <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                                        <h5>
                                            <CountUp redraw={true} end={parseInt(course.students.replaceAll(',', ''))} duration={2} >
                                                {({ countUpRef, start }) => (
                                                    <VisibilitySensor onChange={start} delayedCall>
                                                        <span ref={countUpRef} />
                                                    </VisibilitySensor>
                                                )}
                                            </CountUp>
                                        </h5>
                                        <small>Students</small>
                                    </div>
                                    <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto">
                                        <h5>
                                            <CountUp redraw={true} end={course.projects} duration={2} >
                                                {({ countUpRef, start }) => (
                                                    <VisibilitySensor onChange={start} delayedCall>
                                                        <span ref={countUpRef} />
                                                    </VisibilitySensor>
                                                )}
                                            </CountUp>
                                        </h5>
                                        <small>Projects</small>
                                    </div>
                                </div>
                            </section>



                        </section>
                        :
                        <div className="vh-100 d-flex flex-column align-items-center mx-auto text-white" style={{ marginTop: 150 }}>
                            <h3 >Loading...</h3>
                            <Spinner animation="grow" />

                        </div>
                }
            </Container>
        </div >
    );
};

export default CourseDetails;
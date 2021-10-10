import React from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const CourseDetails = () => {
    return (
        <div className="bg-dark text-white p-5">
            <section className="row mb-5 d-flex mt-5">
                <div className="col-lg-4 mx-auto">
                    <video width="450" controls>
                        <source src="https://mp4-c.udemycdn.com/2018-03-08_20-09-30-1365492dea1831a772c3ed1dd9cf3b66/2/WebHD_720p.mp4?Expires=1633879572&Signature=jhXhbQYQM7T8Zx8tAKZSIZjSFdt0NdKwEVqCt2MxH2-PFnEuco0ltSyA0-P4W0Z6T-djY8mepJjfY-ezatpp0WanZdWiJKwh1NwCtfpMfzvXviFD6W79d1AvYhPVxCc7etZgXBQDcC7rkhPKNEYrF8VKhPLETbMXxBN7ApddJhD47q2GwZmOqwchornIEl3PRL~oh5Fk2lzzzhm~Dy1ffqNrZh3bc7lKmuUjIoMQ224cynBtUoqxi-bTFliiOEw3cOfdLzTTvDJUHHFV5jOcEZHDE7yxSkBUwlmhD8mF0R~EmtNKCuZpysNZOLEZrJ1k4y6cQNLB8yQxNU5g-IgTjA__&Key-Pair-Id=APKAITJV77WS5ZT7262A" />
                    </video>

                </div>
                <div className="col-lg-6 mx-auto text-start mt-0">
                    <h3>2021 Complete Python Bootcamp From Zero to Hero in Python</h3>
                    <p className="mb-2">Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games</p>
                    <small>
                        <b>4.5</b>
                        <Rating
                            className="mx-1"
                            initialRating="4.5"
                            emptySymbol="far fa-star icon-color"
                            fullSymbol="fas fa-star icon-color"
                            readonly
                        ></Rating>
                        (384,717)
                    </small>
                    <br />
                    <small>Created by <a href="">Josee Portilla</a></small>
                    <br />
                    <button className="btn text-white mt-3" style={{ backgroundColor: 'rgb(69, 82, 110)' }}>Buy Course</button>
                </div>

            </section>
            <section className="mb-4 col-9 mx-auto">
                <p className="text-align-justify">Become a Python Programmer and learn one of employer's most requested skills of 2021!

                    This is the most comprehensive, yet straight-forward, course for the Python programming language on Udemy! Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will teach you Python 3.

                    With over 100 lectures and more than 21 hours of video this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio!

                </p>
            </section>
            <section className="mb-4 d-flex align-items-center flex-wrap justify-content-center">
                <div className="shadow-lg p-5 rounded-3 me-5 bg-success">
                    <h5>100</h5>
                    <small>Lectures</small>
                </div>
                <div className="shadow-lg p-5 rounded-3 me-5 bg-success">
                    <h5>59,147</h5>
                    <small>Students</small>
                </div>
                <div className="shadow-lg p-5 rounded-3 bg-success">
                    <h5>30</h5>
                    <small>Projects</small>
                </div>
            </section>


        </div>
    );
};

export default CourseDetails;
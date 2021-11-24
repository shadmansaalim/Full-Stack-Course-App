import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from 'react';
import UserReview from '../UserReview/UserReview';
import { useEffect } from 'react';
import './UserReviews.css';





const UserReviews = ({ reviews }) => {
    const slideCount = reviews.length < 2 ? 1 : 2

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slideCount,
        slidesToScroll: slideCount,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slideCount,
                    slidesToScroll: slideCount,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (

        <div>
            <h1 className="fw-bold mb-5" style={{ fontSize: '42px' }}>Course Reviews</h1>

            <Slider {...settings} className={slideCount === 1 ? "col-lg-5 mx-auto mt-lg-4 mb-5" : "col-lg-10 mx-auto mt-lg-4 mb-5"}>

                {
                    reviews.map(review => <UserReview
                        review={review}
                    >
                    </UserReview>)
                }

            </Slider>

        </div>
    );
};

export default UserReviews;
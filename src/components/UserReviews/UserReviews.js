import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from 'react';
import UserReview from '../UserReview/UserReview';
import { useEffect } from 'react';
import './UserReviews.css';



const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
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


const UserReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    return (
        <div style={{ marginTop: '120px', marginBottom: '80px' }}>
            <h1 className="fw-bold mb-5" style={{ fontSize: '48px' }}>Testimonials</h1>

            <Slider {...settings}>

                {
                    reviews.map(review => <UserReview
                        review={review}
                    >
                    </UserReview>)
                }

            </Slider>

        </div >

    );
};

export default UserReviews;
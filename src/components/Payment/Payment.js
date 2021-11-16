import React from 'react';
import './Payment.css'

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCartContext from '../../hooks/useCartContext';
import { useEffect } from 'react';
import { useState } from 'react';
import empty from '../../images/empty.svg';
import { useHistory } from 'react-router';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


const Payment = () => {
    const [cart, setCart] = useCartContext();
    const [price, setPrice] = useState(0);
    const history = useHistory();

    useEffect(() => {
        let total = 0;
        for (const course of cart) {
            total = total + course.discountedPrice;

        }

        let grandtotal = 0;
        let tax = 0;
        if (total > 0) {
            tax = total * 0.10;
            grandtotal = total + tax;
            setPrice(grandtotal.toFixed(2));
        }
    }, [cart])
    return (
        <div>
            <div className="container my-5">



                {
                    price === 0
                        ?
                        <div className="container-fluid my-5 mx-auto">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="shadow-sm p-4 rounded-3">
                                        <div className="card-body cart">
                                            <div className="col-sm-12 empty-cart-cls text-center">
                                                <img src={empty} className="img-fluid mb-4 mr-3 col-6 col-lg-3" alt="" />
                                                <h3 className="fw-light">Your Cart is Empty</h3>
                                                <p className="m-0">Add a course to continue</p>
                                                <button className="btn btn-outline-primary mt-3" data-abc="true" onClick={() => history.push('/courses')}>
                                                    Browse Courses
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :

                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                price={price}

                            />
                        </Elements>

                }

            </div>
        </div>
    );
};

export default Payment;
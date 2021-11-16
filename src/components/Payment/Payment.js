import React from 'react';
import './Payment.css'

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCartContext from '../../hooks/useCartContext';
import { useEffect } from 'react';
import { useState } from 'react';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


const Payment = () => {
    const [cart, setCart] = useCartContext();
    const [price, setPrice] = useState(0);
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
                <div className="row shadow-lg rounded-3 col-lg-6 mx-auto p-4">

                    <div className="mb-4">
                        <h2 className="fw-light">Provide Personal Details</h2> <span>Please provide your details in order to confirm subscription of courses.</span>
                    </div>


                    {
                        price === 0
                            ?
                            <h1 className="text-dark">Loading</h1>
                            :
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    price={price}
                                />
                            </Elements>

                    }

                </div>
            </div>
        </div>
    );
};

export default Payment;
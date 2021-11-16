import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCartContext from '../../hooks/useCartContext';
import { clearTheCart, getStoredCart } from '../../utilities/LocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const toastId = React.useRef(null);


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const history = useHistory();

    const [cart, setCart] = useCartContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));


    }, [price])




    const onSubmit = async (data) => {

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true);
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            toast.error(error.message);
            setSuccess("");
        } else {
            setError("");
            console.log('[PaymentMethod]', paymentMethod);

        }


        //Payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: data.name,
                        email: data.email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess("");
            toast.error(intentError.message);


        }
        else {
            setError("");
            setSuccess("Your payment processed successfully");
            toast.success("Your Payment processed successfully");
            console.log(paymentIntent);


            const savedCart = getStoredCart();
            // Save to DB
            const payment = {
                courses: savedCart,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            data.order = savedCart;
            data.payment = payment;

            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.insertedId || (result.modifiedCount > 0)) {
                        setProcessing(false);
                        history.push('/order-confirmed');
                        clearTheCart();
                        setCart([]);
                        reset();
                    }
                })
        }


    };


    console.log(toast);
    return (
        <div className="row shadow-lg rounded-3 col-lg-6 mx-auto p-4">

            <div className="mb-4">
                <h2 className="fw-light">Provide Personal Details</h2> <span>Please provide your details in order to confirm subscription of courses.</span>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card pay-card p-3">
                    <h6 className="text-uppercase text-start">User Information</h6>
                    <div className="inputbox mt-3">
                        <input defaultValue={user.displayName} {...register("name")} className="form-control pay-control" />
                        <span>Name</span>
                    </div>
                    <div className="inputbox mt-3">
                        <input type="email" className="form-control pay-control" defaultValue={user.email}  {...register("email", { required: true })} />
                        <span>Email</span>
                        {errors.email && <span>This field is required</span>}
                    </div>
                    <div className="inputbox mt-3">
                        <input type="number" className="form-control pay-control" defaultValue="" {...register("phone")} required />
                        <span>Phone</span>
                    </div>





                    <div className="mt-3 mb-3">
                        <h6 className="text-uppercase text-start">Billing Address</h6>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className="inputbox mt-3 mr-2">
                                    <input type="text" className="form-control pay-control"
                                        required="required" defaultValue="" {...register("country")} />
                                    <span>Country</span> </div>
                            </div>
                            <div className="col-md-6">
                                <div className="inputbox mt-3 mr-2">
                                    <input type="text" className="form-control pay-control"
                                        required="required" defaultValue="" {...register("city")} />
                                    <span>City</span> </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 mb-3">
                        <h6 className="text-uppercase mb-4 text-start">Payment Information</h6>
                        <div className="row mt-2">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}

                            />
                        </div>
                    </div>

                    <div className="mt-4 mb-4 d-flex justify-content-between">
                        <button onClick={() => history.push('/review')} className="btn btn-secondary px-3"
                        ><FontAwesomeIcon icon={faBackward} /> Previous</button>
                        {
                            processing && !error
                                ?
                                <button class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...
                                </button>
                                :
                                <button type="submit"
                                    disabled={!stripe || success}
                                    className="btn btn-primary px-3">Proceed <FontAwesomeIcon icon={faForward} /></button>
                        }
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;
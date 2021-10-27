import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCartContext from '../../hooks/useCartContext';
import { clearTheCart, getStoredCart } from '../../utilities/LocalStorage';
import './Shipping.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const Shipping = () => {
    const [cart, setCart] = useCartContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        const savedCart = getStoredCart();
        data.order = savedCart;

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.insertedId) {
                    clearTheCart();
                    setCart([]);
                    history.push('/order-confirmed');
                    reset();
                }
            })
    };
    const { user } = useAuth();
    const history = useHistory();

    return (
        <div>
            <div className="container mt-5 px-5">

                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="mb-4">
                            <h2 className="fw-light">Provide Personal Details</h2> <span>Please provide your details in order to confirm subscription of courses.</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card pay-card p-3">
                            <h6 className="text-uppercase">User Information</h6>
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
                                <h6 className="text-uppercase">Billing Address</h6>
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
                            <div className="mt-4 mb-4 d-flex justify-content-between">
                                <button onClick={() => history.push('/review')} className="btn btn-secondary px-3"
                                ><FontAwesomeIcon icon={faBackward} /> Previous</button>
                                <button type="submit"
                                    className="btn btn-primary px-3">Proceed <FontAwesomeIcon icon={faForward} /></button> </div>
                        </form>
                    </div>
                </div>
            </div>





        </div>
    );
};

export default Shipping;
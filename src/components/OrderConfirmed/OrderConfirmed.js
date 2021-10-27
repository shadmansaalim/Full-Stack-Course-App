import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import img from '../../images/payment.svg'

const OrderConfirmed = () => {
    const history = useHistory();
    return (
        <div className="text-center my-5 col-lg-6 mx-auto" >
            <img className="img-fluid w-25 mx-auto mb-4" src={img} alt="" />
            <h1 className="display-3" > Thank You!</h1 >
            <p className="lead" > <strong>Course Purchased Successfully</strong> Please check your email for subscription details and order invoice. You will now be able to see course details on <strong>My Classes</strong></p >
            <hr></hr>
            <p>
                Having trouble? <a target="_blank" rel="noreferrer" href="https://github.com/shadmansaalim">Contact us</a>
            </p>
            <p className="lead" >
                <button onClick={() => history.push('/my-classes')} className="btn btn-outline-primary" >My Classes</button >
            </p >
        </div >
    );
};

export default OrderConfirmed;
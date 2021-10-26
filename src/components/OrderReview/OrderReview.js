import React from 'react';
import { useHistory } from 'react-router-dom';
import useCartContext from '../../hooks/useCartContext';
import { deleteFromDb } from '../../utilities/LocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart'
import './OrderReview.css'

const OrderReview = () => {
    const [cart, setCart] = useCartContext();
    const history = useHistory();
    const handleRemove = id => {
        const newCart = cart.filter(course => course._id !== id)
        setCart(newCart);
        deleteFromDb(id);
    }
    const handleShipping = () => {
        history.push('/shipping');
    }
    const navigateToCourses = () => {
        history.push('/courses')
    }
    return (
        <div className="container">
            <div className="row g-5 mt-3 vh-100">

                <div className="col-md-7 col-lg-8">
                    <p className="text-center bg-dark text-white p-2 rounded-3">You added the following courses <FontAwesomeIcon className="ms-1" icon={faShoppingBag} />
                    </p>
                    {
                        cart.map(course => <ReviewItem
                            key={course._id}
                            course={course}
                            handleRemove={handleRemove}
                        ></ReviewItem>)
                    }
                </div>


                {
                    cart.length ? <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-dark">Your cart</span>
                            <span className="badge bg-dark rounded-pill">{cart.length}</span>
                        </h4>

                        <Cart cart={cart}></Cart>

                        <div className="card p-2">
                            <button onClick={handleShipping} className="btn btn-success">Proceed to Shipment <FontAwesomeIcon icon={faShoppingCart} /></button>
                        </div>
                    </div> : null
                }
            </div>
        </div>
    );
};

export default OrderReview;
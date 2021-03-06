import React from 'react';
import { useHistory } from 'react-router-dom';
import useCartContext from '../../hooks/useCartContext';
import { cartItemCount, deleteFromDb } from '../../utilities/LocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faShoppingBag, faAngleDoubleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart'
import './OrderReview.css'
import empty from '../../images/empty.svg'
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useState } from 'react';

const OrderReview = () => {
    const [cart, setCart] = useCartContext();
    const history = useHistory();
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(cartItemCount());
    }, [cart.length])

    const handleRemove = id => {
        swal({
            title: "Are you sure?",
            text: "Selected course will be removed from cart",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const newCart = cart.filter(course => course.courseID !== id)
                    setCart(newCart);
                    deleteFromDb(id);
                }
            });

    }
    const navigateToCourses = () => {
        history.push('/courses')
    }
    return (
        <div className="container my-5">

            {
                count > 0
                    ?
                    <div className="row g-5 mt-3">
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


                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-dark">Your cart</span>
                                <span className="badge bg-dark rounded-pill">{cart.length}</span>
                            </h4>

                            <Cart cart={cart}></Cart>

                            <div className="card p-2">
                                <button onClick={() => history.replace('/payment')} className="btn btn-success">Checkout <FontAwesomeIcon icon={faAngleDoubleRight} /></button>
                            </div>
                        </div>
                    </div>
                    :
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

            }
        </div>
    );
};

export default OrderReview;
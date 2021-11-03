import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { deleteFromDb } from '../../utilities/LocalStorage';



const Cart = (props) => {
    const { cart } = props;
    // const { user } = useAuth();


    // useEffect(() => {
    //     if (user.email) {
    //         fetch(`https://stormy-taiga-36853.herokuapp.com/myClasses?email=${user.email}`, {
    //             headers: {
    //                 'authorization': `Bearer ${localStorage.getItem('courseIdToken')}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(result => {
    //                 for (const course of cart) {
    //                     for (const userCourse of result) {
    //                         if (course.courseID === userCourse.courseID) {
    //                             deleteFromDb(course.courseID);
    //                         }
    //                     }

    //                 }
    //             })
    //     }

    // }, [user])


    let total = 0;
    for (const course of cart) {
        total = total + course.discountedPrice;

    }

    let grandtotal = 0;
    let tax = 0;
    if (total > 0) {
        tax = total * 0.10;
        grandtotal = total + tax;
    }


    return (
        <ul className="list-group mb-3">

            {
                cart.map(course => (
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <p className="my-0"><small>{course.name}</small></p>

                        </div>
                        <span className="text-muted ms-4">${course.discountedPrice}</span>
                    </li>
                ))
            }

            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="text-dark">
                    <h6 className="my-0">SubTotal</h6>
                </div >
                <span className="text-dark" > ${total.toFixed(2)}</span >
            </li >
            <li className="list-group-item d-flex justify-content-between align-items-center" >
                <div className="text-dark" >
                    <h6 className="my-0" > Tax</h6 >
                </div >
                <span className="text-dark" > ${tax.toFixed(2)}</span >
            </li >
            <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${grandtotal.toFixed(2)}</strong>
            </li>
        </ul >
    );
};

export default Cart;
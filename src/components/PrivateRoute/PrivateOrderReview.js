import React from 'react';
import { Redirect, Route } from 'react-router';
import useCartContext from '../../hooks/useCartContext';
import { Spinner } from 'react-bootstrap';

const PrivateOrderReview = ({ children, ...rest }) => {
    const [cart, setCart, count, countLoading] = useCartContext();
    if (countLoading) {
        return (
            <div className="vh-100 d-flex flex-column align-items-center mx-auto text-dark" style={{ marginTop: 150 }}>
                <h3 >Loading...</h3>
                <Spinner animation="grow" />

            </div>
        );

    }
    return (
        <Route
            {...rest}
            render={({ location }) => count > 0 ?
                children
                :
                <Redirect
                    to={{
                        pathname: "/courses",
                        state: { from: location }
                    }}
                ></Redirect>


            }
        >
        </Route >
    );
};

export default PrivateOrderReview;
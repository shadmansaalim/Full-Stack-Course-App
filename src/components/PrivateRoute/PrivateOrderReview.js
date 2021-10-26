import React from 'react';
import { Redirect, Route } from 'react-router';
import useCartContext from '../../hooks/useCartContext';

const PrivateOrderReview = ({ children, ...rest }) => {
    const [cart] = useCartContext();
    return (
        <Route
            {...rest}
            render={({ location }) => cart.length ?
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
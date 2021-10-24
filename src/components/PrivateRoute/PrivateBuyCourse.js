import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Redirect, Route } from 'react-router';
import { Spinner } from 'react-bootstrap';


const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <div className="vh-100 d-flex flex-column align-items-center mx-auto text-white" style={{ marginTop: 150 }}>
                <h3 >Loading...</h3>
                <Spinner animation="grow" />

            </div>
        );

    }
    return (
        <Route
            {...rest}
            render={({ location }) => user.email ? children :
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                ></Redirect>}
        >

        </Route>
    );
};

export default PrivateRoute;
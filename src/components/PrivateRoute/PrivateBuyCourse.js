import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Redirect, Route } from 'react-router';


const PrivateBuyCourse = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner"></div>
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
                        state: { from: location },
                        //Sending modal count to detect how many time to show modal
                        modalCount: 1
                    }}
                ></Redirect>}
        >

        </Route>
    );
};

export default PrivateBuyCourse;
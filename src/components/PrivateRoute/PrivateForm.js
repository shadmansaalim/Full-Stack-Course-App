import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Redirect, Route } from 'react-router';

const PrivateForm = ({ children, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => !user.email ?
                children
                :
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }}
                ></Redirect>


            }
        >
        </Route >
    );
};

export default PrivateForm;
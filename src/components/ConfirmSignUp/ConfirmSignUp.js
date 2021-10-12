import React from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const ConfirmSignUp = () => {
    const history = useHistory();
    const { user } = useAuth();
    const { displayName, email, emailVerified } = user;


    const continueSignUp = () => {
        if (emailVerified) {
            history.push('/home');
        }
        else {

        }
    }
    return (
        <div className="my-5">
            <p className="fw-bold">Hey {displayName} You're almost done. We have sent a verification email at {email}. Please verify to continue</p>
            <button onClick={continueSignUp} className="mt-3">Continue</button>
        </div>
    );
};

export default ConfirmSignUp;
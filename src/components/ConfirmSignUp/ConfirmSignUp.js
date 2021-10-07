import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserDetailsContext } from '../../App';

const ConfirmSignUp = () => {
    const [user] = useContext(UserDetailsContext);
    console.log(user)
    const history = useHistory();
    const { displayName, email, emailVerfied } = user;


    const continueSignUp = () => {
        if (emailVerfied) {
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
import React from 'react';
import loginImg from '../../images/login.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const auth = getAuth();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleLoginEmailChange = e => {
        setLoginEmail(e.target.value);
    }
    const handleLoginPasswordChange = e => {
        setLoginPassword(e.target.value);
    }

    const handleForgetPassword = () => {
        sendPasswordResetEmail(auth, loginEmail)
            .then(() => {

            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <section style={{ marginTop: 100, marginBottom: 150 }}>
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-8 col-lg-5 col-xl-5 mx-auto mb-4 mb-lg-0">
                        <img src={loginImg} class="img-fluid"
                            alt="Sample" />
                    </div>
                    <div class="col-md-8 col-lg-5 col-xl-4 offset-xl-1 shadow-lg p-5 rounded-3 mx-auto">
                        <form onSubmit={handleLogin}>
                            <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" class="btn btn-outline-primary rounded-circle mx-1">
                                    <i class="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" class="btn btn-outline-primary rounded-circle mx-1">
                                    <i class="fab fa-google"></i>
                                </button>

                                <button type="button" class="btn btn-outline-primary rounded-circle mx-1">
                                    <i class="fab fa-twitter"></i>
                                </button>
                            </div>


                            <p class="text-center fw-bold mx-3 my-4">OR</p>


                            <div class="form-outline mb-4">
                                <input onBlur={handleLoginEmailChange} type="email" id="form3Example3" class="form-control form-control-lg"
                                    placeholder="Enter a valid email address" />

                            </div>


                            <div class="form-outline mb-3">
                                <input onBlur={handleLoginPasswordChange} type="password" id="form3Example4" class="form-control form-control-lg"
                                    placeholder="Enter password" />
                            </div>

                            <div class="d-flex justify-content-between align-items-center">

                                <div class="form-check mb-0">
                                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label class="form-check-label" for="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a onClick={handleForgetPassword} href="#!" class="text-body">Forgot password?</a>
                            </div>

                            <div class="text-center text-lg-start mt-4 pt-2">
                                <Button type="submit" variant="primary">Login <FontAwesomeIcon icon={faSignInAlt} /></Button>
                                <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/sign-up"
                                    class="link-danger">Sign Up</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
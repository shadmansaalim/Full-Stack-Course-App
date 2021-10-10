import React from 'react';
import loginImg from '../../images/login.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { handleLogin, handleLoginEmailChange, handleLoginPasswordChange, handleForgetPassword } = useAuth();
    const history = useHistory();

    const loginSubmission = (e) => {
        e.preventDefault();
        handleLogin()
            .then(result => {
                console.log('LOGIN', result.user);
                history.push('/home');
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <section style={{ marginTop: 100, marginBottom: 150 }}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-5 col-xl-5 mx-auto mb-4 mb-lg-0">
                        <img src={loginImg} className="img-fluid"
                            alt="Sample" />
                    </div>
                    <div className="col-md-8 col-lg-5 col-xl-4 offset-xl-1 shadow-lg p-5 rounded-3 mx-auto">
                        <form onSubmit={loginSubmission}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" className="btn btn-outline-primary rounded-circle mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-outline-primary rounded-circle mx-1">
                                    <i className="fab fa-google"></i>
                                </button>

                                <button type="button" className="btn btn-outline-primary rounded-circle mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>
                            </div>


                            <div class="divider d-flex align-items-center my-4">
                                <p class="text-center fw-bold mx-2 mb-0" style={{ color: 'rgb(69, 82, 110)' }}>OR</p>
                            </div>


                            <div className="form-floating mb-3">
                                <input onBlur={handleLoginEmailChange} type="email" className="form-control" id="floatingLoginEmail" placeholder="name@example.com" />
                                <label htmlFor="floatingLoginEmail">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input onBlur={handleLoginPasswordChange} type="password" className="form-control" id="floatingLoginPassword" placeholder="Password" />
                                <label htmlFor="floatingLoginPassword">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a onClick={handleForgetPassword} href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <Button type="submit" variant="primary">Login <FontAwesomeIcon icon={faSignInAlt} /></Button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/sign-up"
                                    className="link-danger">Sign Up</a></p>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
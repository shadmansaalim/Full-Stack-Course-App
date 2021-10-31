import React from 'react';
import loginImg from '../../images/login.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';

const Login = () => {
    const { user, handleLogin, handleLoginEmailChange, handleLoginPasswordChange, handleForgetPassword, handleFacebookSignUp, handleGoogleSignUp, handleTwitterSignUp } = useAuth();
    const history = useHistory();

    //Using location to redirect the user to his/her desired destination if the user was redirected to login page by the system. Doing this to improve the UX of the user.
    const location = useLocation();
    const redirectURL = location.state?.from || '/home';


    //Displaying the modal only once using modalCount from location otherwise modal will be displayed everytime after user reloads [Bug Fixed]
    useEffect(() => {
        for (let i = 0; i < location.modalCount; i++) {
            if (!user.email) {
                if (location.state?.from.pathname === "/my-classes") {
                    swal("Please Login!", "You can only view your classes after logging in", "warning");
                }
                else if (location.state?.from.pathname === "/shipping") {
                    swal("Please Login!", "You can only purchase a course after logging in", "warning");
                }
            }
        }

    }, [])







    const loginSubmission = (e) => {
        e.preventDefault();
        handleLogin()
            .then(result => {
                history.push(redirectURL);
                e.target.reset();
            })
            .catch(error => {

                if (error.message == "Firebase: Error (auth/wrong-password).") {
                    swal("Invalid Password!", "Please check your email & password and then try again", "error");
                }
                else if (error.message == "Firebase: Error (auth/user-not-found).") {
                    swal("User Not Found!", "Please check your email & password and then try again", "warning");
                }

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
                                <button onClick={handleFacebookSignUp} type="button" className="btn btn-outline-primary rounded-circle mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button onClick={handleGoogleSignUp} type="button" className="btn btn-outline-primary rounded-circle mx-1">
                                    <i className="fab fa-google"></i>
                                </button>

                                <button onClick={handleTwitterSignUp} type="button" className="btn btn-outline-primary rounded-circle mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>
                            </div>


                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-2 mb-0" style={{ color: 'rgb(69, 82, 110)' }}>OR</p>
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
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/sign-up"
                                    className="link-danger">Sign Up</Link></p>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
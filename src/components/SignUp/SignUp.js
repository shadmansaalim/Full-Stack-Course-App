import React from 'react';
import useAuth from '../../hooks/useAuth';
import signupImg from '../../images/signup.svg'
import { Link } from 'react-router-dom';

const SignUp = () => {

    const { handleSignUp, handleNameChange, handleSignUpEmailChange, handleSignUpPasswordChange, handleFacebookSignUp, handleGoogleSignUp, verifyEmail, setUserDetails, setUser, handleTwitterSignUp, setIsLoading } = useAuth();

    const signUpSubmission = (e) => {
        e.preventDefault();
        setIsLoading(true)
        handleSignUp()
            .then(result => {
                setUser(result.user);
                verifyEmail();
                setUserDetails()
            })
            .catch(error => {
                setUser({});
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    return (
        <section className="my-5">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-10 mt-4">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center fw-bold mb-4 mb-lg-5 mx-1 mx-md-4 mt-4 mt-lg-0">Sign Up and Start Learning from Today!</p>

                                        <form onSubmit={signUpSubmission} className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onBlur={handleNameChange} type="text" id="form3Example1c" className="form-control" placeholder="Your Name" required />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onBlur={handleSignUpEmailChange} type="email" id="form3Example3c" className="form-control" placeholder="Your Email" required />
                                                </div>
                                            </div>

                                            {/* <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onBlur={handlePhoneChange} type="number" className="form-control" placeholder="Your Phone" required />
                                                </div>
                                            </div> */}


                                            {/* Taking Image From User */}
                                            {/* <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="input-group mb-0">
                                                    <div className="small text-muted text-start">Upload your profile picture</div>
                                                    <div className="d-flex">
                                                        <input onBlur={handleImageChange} type="file" className="form-control" id="inputGroupFile01" required />
                                                    </div>
                                                </div>
                                            </div> */}



                                            <div className="d-flex flex-row align-items-center mb-3">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onBlur={handleSignUpPasswordChange} type="password" id="form3Example4c" className="form-control" placeholder="Password" required />
                                                </div>
                                            </div>

                                            {/* <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" placeholder="Repeat your password" required />
                                                </div>
                                            </div> */}

                                            <div className="form-check d-flex justify-content-center align-items-center mb-3 mt-4">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    value=""
                                                    id="form2Example3c"
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="form2Example3c">
                                                    <small>I agree all statements in <a href="#!">Terms of service</a></small>
                                                </label>

                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary">Sign Up</button>
                                            </div>

                                            <div className="divider d-flex align-items-center my-4">
                                                <p className="text-center fw-bold mx-2 mb-0" style={{ color: 'rgb(69, 82, 110)' }}>OR</p>
                                            </div>

                                            <div className="d-flex flex-row align-items-center justify-content-center mb-4">
                                                <p className="text-center fw-bold mb-0 me-2">Sign Up With</p>
                                                <button onClick={handleFacebookSignUp} className="btn btn-outline-primary rounded-circle mx-1">
                                                    <i className="fab fa-facebook-f"></i>
                                                </button>

                                                <button onClick={handleGoogleSignUp} className="btn btn-outline-primary  rounded-circle mx-1">
                                                    <i className="fab fa-google"></i>
                                                </button>

                                                <button onClick={handleTwitterSignUp} className="btn btn-outline-primary  rounded-circle mx-1">
                                                    <i className="fab fa-twitter"></i>
                                                </button>
                                            </div>




                                            <div className="text-center mt-4"> <span>Already a member?</span> <Link to="/login">Login</Link> </div>


                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-6 d-flex align-items-center order-1 order-lg-2 mx-auto">
                                        <img src={signupImg} className="img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default SignUp;
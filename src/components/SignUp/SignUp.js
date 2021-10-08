import React from 'react';
import signupImg from '../../images/signup.svg'
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import initializeAuthentication from '../../Firebase/firebase.init'
import { useState } from 'react';
import { useContext } from 'react';
import { UserDetailsContext } from '../../App';
initializeAuthentication();



const SignUp = () => {
    const [user, setUser] = useContext(UserDetailsContext);
    const [name, setName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();
    const auth = getAuth();


    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleSignUpEmailChange = e => {
        setSignUpEmail(e.target.value);
    }

    const handlePhoneChange = e => {
        setPhone(e.target.value);
    }

    const handleImageChange = e => {
    }

    const handleSignUpPasswordChange = e => {
        setSignUpPassword(e.target.value);
    }


    const handleSignUp = (e) => {
        e.preventDefault();
        // if (!/(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/.test(password)) {
        //     setError(<ul>
        //         <h4>Invalid Password! Please check whether your password contains the following characters</h4>
        //         <li>8 characters length</li>
        //         <li>2 letters in Upper Case</li>
        //         <li>1 Special Character (!@#$&*)</li>
        //         <li>2 numerals (0-9)</li>
        //         <li>3 letters in Lower Case</li>
        //     </ul>)
        //     return;
        // }


        createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
            .then(result => {
                verifyEmail();
                setUserDetails();
                setUser(result.user);
                history.push('/home');

            })
            .catch(error => {
                setError(error.message);
            })

    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {

            })
            .catch(error => {

            })
    }

    const setUserDetails = () => {
        updateProfile(auth.currentUser, { displayName: name, email: signUpEmail })
            .then(result => {

            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <section className="mb-5">
            <div className="container h-100">
                <div className="text-danger mb-4 col-8 mx-auto">{error}</div>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up and Start Learning from Today!</p>

                                        <form onSubmit={handleSignUp} className="mx-1 mx-md-4">

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



                                            <div className="d-flex flex-row align-items-center mb-4">
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

                                            <div className="form-check d-flex justify-content-center align-items-center mb-3">
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
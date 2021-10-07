import React from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import initializeAuthentication from '../../Firebase/firebase.init';
import { useState } from 'react';
initializeAuthentication();

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth();


    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePhoneChange = e => {
        setPhone(e.target.value);
    }

    const handleImageChange = e => {
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }


    const handleSignUp = (e) => {
        e.preventDefault();
        verifyEmail();
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const { emailVerified } = result.user;
                if (emailVerified) {
                    setUserName();
                }
                else {
                    setError('Please verify your email first');
                }
            })

    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {

            })
    }

    const setUserName = () => {
        updateProfile(auth.currentUser, { displayName: name, email: email, phoneNumber: phone })
            .then(result => {

            })
    }
    return (
        <section className="mb-5">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

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
                                                    <input onBlur={handleEmailChange} type="email" id="form3Example3c" className="form-control" placeholder="Your Email" required />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onBlur={handlePhoneChange} type="number" className="form-control" placeholder="Your Phone" required />
                                                </div>
                                            </div>


                                            {/* Taking Image From User */}
                                            {/* <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="input-group mb-0">
                                                    <div class="small text-muted text-start">Upload your profile picture</div>
                                                    <div className="d-flex">
                                                        <input onBlur={handleImageChange} type="file" class="form-control" id="inputGroupFile01" required />
                                                    </div>
                                                </div>
                                            </div> */}



                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onBlur={handlePasswordChange} type="password" id="form3Example4c" className="form-control" placeholder="Password" required />
                                                </div>
                                            </div>

                                            {/* <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" placeholder="Repeat your password" required />
                                                </div>
                                            </div> */}

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    value=""
                                                    id="form2Example3c"
                                                    required
                                                />
                                                <label className="form-check-label" for="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                            <h3>{error}</h3>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png" className="img-fluid" alt="" />

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
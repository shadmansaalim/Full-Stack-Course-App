import React from 'react';
import useFirebase from '../../hooks/useFirebase';
import './UserProfile.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const { user, setUser, setUserDetails, setName, setSignUpEmail } = useFirebase();

    const handleNameChange = e => {
        // setName(e.target.value)
        // setUserDetails()
        //     .then(() => {

        //     })
        //     .catch(error => {

        //     })
    }
    const handleEmailChange = e => {
        // setSignUpEmail(e.target.value)
        // setUserDetails()
        //     .then(() => {

        //     })
        //     .catch(error => {

        //     })
    }

    const handleUpdateUser = (e) => {
        console.log('user updated')
        e.preventDefault();
    }

    return (
        <div>
            <div class="container profile my-5">
                <div class="main-body">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src={user.photoURL} alt="Admin" class="rounded-circle p-1 bg-primary" width="110" />
                                        <div class="mt-3">
                                            <h4>{user.displayName}</h4>
                                            <p >Student</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 class="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 class="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 class="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 class="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 class="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="card">
                                <form onSubmit={handleUpdateUser} class="card-body">
                                    <div class="row mb-2">
                                        <div class="col-sm-3 d-flex align-items-center justify-content-center">
                                            <h6 class="mb-0">Full Name</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input onChange={handleNameChange} type="text" class="form-control" value={user.displayName || ''} required />
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col-sm-3 d-flex align-items-center justify-content-center">
                                            <h6 class="mb-0">Email</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input onChange={handleEmailChange} type="email" class="form-control" value={user.email || ''} required />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3"></div>
                                        <div class="col-sm-9 text-secondary">
                                            <input type="submit" class="btn btn-primary px-4" value="Save Changes" />
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
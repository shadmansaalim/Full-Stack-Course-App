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
            <div className="container profile my-5">
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={user.photoURL} alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                        <div className="mt-3">
                                            <h4>{user.displayName}</h4>
                                            <p >Student</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 className="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 className="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 className="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 className="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                                            <Link to="/my-classes" className="text-dark text-decoration-none">
                                                <h6 className="mb-0 text-center">My Classes</h6>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <form onSubmit={handleUpdateUser} className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-sm-3 d-flex align-items-center justify-content-center">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input onChange={handleNameChange} type="text" className="form-control" value={user.displayName || ''} required />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-3 d-flex align-items-center justify-content-center">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input onChange={handleEmailChange} type="email" className="form-control" value={user.email || ''} required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="submit" className="btn btn-primary px-4" value="Save Changes" />
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
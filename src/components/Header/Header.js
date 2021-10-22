import React from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import './Header.css'
const Header = () => {
    const history = useHistory();
    const { user, logOut } = useAuth();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        // Website Top Navigation Bar
        <Navbar className="shadow-lg" expand="lg">
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                        width="80"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="text-decoration-none me-lg-4" exact to="/"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>Home</NavLink>
                        <NavLink className="text-decoration-none me-lg-4" exact to="/courses"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>Courses</NavLink>
                        <NavLink className="text-decoration-none me-lg-4" exact to="/my-classes"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>My Classes</NavLink>
                        <NavLink className="text-decoration-none me-lg-4" exact to="/about"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>About</NavLink>
                        <NavLink className="text-decoration-none" exact to="/developer"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>Developer</NavLink>
                    </Nav>
                    <Nav className="ms-auto">
                        {
                            user.email ?
                                user.photoURL ?
                                    <img className="img-fluid rounded-circle mx-auto mt-2 mt-lg-0" src={user.photoURL} alt={user.displayName} style={{ width: 40, height: 40 }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.displayName} onClick={handleShow} ></img>
                                    :
                                    <FontAwesomeIcon className="fs-1 text-secondary mx-auto mt-2 mt-lg-0" data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.displayName} icon={faUserCircle} onClick={handleShow} />

                                :
                                <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-0">
                                    <Button className="me-lg-4" onClick={() => history.push('/sign-up')} variant="outline-primary">Sign Up <FontAwesomeIcon icon={faUserPlus} /></Button>
                                    <Button className="mt-1 mt-lg-0" onClick={() => history.push('/login')} variant="primary">Login <FontAwesomeIcon icon={faSignInAlt} /></Button>
                                </div>
                        }

                        <Offcanvas show={show} onHide={handleClose} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="text-center">
                                    {
                                        user.photoURL ?
                                            <img className=" img-fluid rounded-circle settings-user-img" src={user.photoURL} alt={user.displayName}></img>
                                            :
                                            <FontAwesomeIcon className="fs-1 text-secondary settings-user-img" icon={faUserCircle} />
                                    }
                                    <p className="mt-2">{user.displayName}</p>
                                    <button className="btn btn-block">My Classes</button>
                                    <button onClick={() => {
                                        logOut();
                                        handleClose();
                                    }} className="btn btn-warning">Log Out</button>
                                </div>

                            </Offcanvas.Body>
                        </Offcanvas>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
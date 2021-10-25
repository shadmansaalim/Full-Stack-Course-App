import React from 'react';
import { Navbar, Container, Nav, Button, Offcanvas, Modal } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import './Header.css'
import { getStoredCart, cartItemCount } from '../../utilities/LocalStorage';
import useCourses from '../../hooks/useCourses';
import Cart from '../Cart/Cart';
import useCart from '../../hooks/useCart';
import { useEffect } from 'react';
import useCartContext from '../../hooks/useCartContext';
const Header = () => {
    const history = useHistory();
    const [courses, setCourses] = useCourses();
    const [cart, setCart, count] = useCartContext();
    const { user, logOut } = useAuth();
    const [offCanvasShow, setOffCanvasShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);




    const handleOffCanvasClose = () => setOffCanvasShow(false);
    const handleOffCanvasShow = () => setOffCanvasShow(true);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);


    //Getting courses that are added to cart using local storage
    // for (const item of cart) {
    //     console.log(item);
    // }

    return (
        // Website Top Navigation Bar
        <Navbar className="shadow-lg pt-lg-3" expand="lg">
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
                    <Nav className="me-auto d-flex align-items-center">
                        <NavLink className="text-decoration-none ms-lg-2 me-lg-3" exact to="/"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>Home</NavLink>
                        <NavLink className="text-decoration-none me-lg-3" exact to="/courses"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>Courses</NavLink>
                        <NavLink className="text-decoration-none me-lg-3" exact to="/my-classes"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>My Classes</NavLink>
                        <NavLink className="text-decoration-none me-lg-3" exact to="/about"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>About</NavLink>
                        <NavLink className="text-decoration-none me-lg-3" exact to="/developer"
                            style={{ color: '#161c2d' }}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#0275d8"
                            }}>Developer</NavLink>

                        <button className="btn btn-outline-dark mt-2 mt-lg-0 px-2 py-1 position-relative" onClick={handleModalShow}><FontAwesomeIcon icon={faShoppingCart} />
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                {count}
                                <span class="visually-hidden">Course Cart</span>
                            </span>
                        </button>

                        <Modal show={modalShow} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Cart cart={cart}></Cart>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleModalClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </Nav>
                    <Nav className="ms-auto">
                        {
                            user.email ?
                                user.photoURL ?
                                    <img className="img-fluid rounded-circle mx-auto mt-2 mt-lg-0" src={user.photoURL} alt="User" style={{ width: 40, height: 40 }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.displayName} onClick={handleOffCanvasShow} ></img>
                                    :
                                    <FontAwesomeIcon className="fs-1 text-secondary mx-auto mt-2 mt-lg-0" data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.displayName} icon={faUserCircle} onClick={handleOffCanvasShow} />

                                :
                                <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-0">
                                    <Button className="me-lg-3" onClick={() => history.push('/sign-up')} variant="outline-primary">Sign Up <FontAwesomeIcon icon={faUserPlus} /></Button>
                                    <Button className="mt-1 mt-lg-0" onClick={() => history.push('/login')} variant="primary">Login <FontAwesomeIcon icon={faSignInAlt} /></Button>
                                </div>
                        }

                        <Offcanvas show={offCanvasShow} onHide={handleOffCanvasClose} placement="end" style={{ maxWidth: 300 }}>
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
                                    <button className="btn btn-block rounded-pill btn-dark">View Profile</button>
                                    <div className="divider d-flex align-items-center my-4">

                                    </div>
                                    <button onClick={() => {
                                        logOut();
                                        handleOffCanvasClose();
                                    }} className="btn btn-warning">Log Out</button>


                                </div>

                            </Offcanvas.Body>
                        </Offcanvas>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default Header;
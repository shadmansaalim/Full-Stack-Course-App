import React from 'react';
import { Navbar, Container, Nav, Button, Offcanvas, Modal } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUserCircle, faShoppingCart, faForward, faGraduationCap, faSignOutAlt, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import './Header.css'
import Cart from '../Cart/Cart';
import useCartContext from '../../hooks/useCartContext';
import { useEffect } from 'react';
import { cartItemCount, deleteFromDb } from '../../utilities/LocalStorage';

const Header = () => {
    const history = useHistory();
    const [cart, setCart] = useCartContext();
    const { user, logOut } = useAuth();

    const [count, setCount] = useState(0);

    // Checking whether the course added to cart is already purchased or not
    useEffect(() => {
        if (user.email && cart.length) {
            fetch(`http://localhost:5000/myClasses?email=${user.email}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('courseIdToken')}`
                }
            })
                .then(res => res.json())
                .then(result => {

                    if (result !== 0) {
                        for (const course of cart) {
                            for (const userCourse of result) {
                                if (course.courseID === userCourse.courseID) {

                                    const newCart = cart.filter(c => cart.indexOf(c) !== cart.indexOf(course));
                                    setCart(newCart);
                                    deleteFromDb(course.courseID);
                                }
                            }

                        }
                    }
                })
        }
        setCount(cartItemCount());
    }, [cart, setCart, user.email])




    const [offCanvasShow, setOffCanvasShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);


    const handleOffCanvasClose = () => setOffCanvasShow(false);
    const handleOffCanvasShow = () => setOffCanvasShow(true);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);


    const goToReview = () => {
        handleModalClose();
        history.push('/review');
    }

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
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                {count}
                                <span className="visually-hidden">Course Cart</span>
                            </span>
                        </button>

                        <Modal show={modalShow} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Courses Added</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    count > 0
                                        ?
                                        <Cart key={cart.map(c => c._id)} cart={cart}></Cart>
                                        :
                                        <div className="container-fluid my-5">
                                            <div className="offset-lg-3 col-12 text-center mx-auto">
                                                <img src="https://codescandy.com/coach/rtl/assets/images/bag.svg" alt="" className="img-fluid mb-4" />
                                                <h3 className="fw-bold">Your shopping cart is empty</h3>
                                                <p className="mb-4">
                                                    Add some courses for your delivery slot. Before proceeding to checkout you must add some courses to your shopping cart. You will find a lot of amazing courses on our courses page with limited offers.
                                                </p>
                                            </div>
                                        </div>
                                }

                            </Modal.Body>
                            <Modal.Footer>
                                {
                                    count > 0
                                        ?
                                        <div>
                                            <Button variant="secondary" onClick={handleModalClose}>
                                                Close
                                            </Button>
                                            <Button className="ms-2" variant="primary" onClick={goToReview}>
                                                Review Order <FontAwesomeIcon icon={faForward} />
                                            </Button>
                                        </div>
                                        :
                                        <Button variant="primary" onClick={() => {
                                            handleModalClose();
                                            history.push('/courses')
                                        }}>
                                            Browse Courses
                                        </Button>
                                }


                            </Modal.Footer>
                        </Modal>

                    </Nav>
                    <Nav className="ms-auto">
                        {
                            user.email ?
                                <>
                                    {
                                        user.photoURL ?
                                            <img className="img-fluid rounded-circle mx-auto mt-2 mt-lg-0" src={user.photoURL} alt="User" style={{ width: 40, height: 40 }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.displayName} onClick={handleOffCanvasShow} ></img>
                                            :
                                            <FontAwesomeIcon className="fs-1 text-secondary mx-auto mt-2 mt-lg-0" data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.displayName} icon={faUserCircle} onClick={handleOffCanvasShow} />
                                    }
                                </>
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
                                    <div className="divider d-flex align-items-center my-4">

                                    </div>
                                    <NavLink to="/my-classes" onClick={handleOffCanvasClose}>
                                        <button className="drawer-buttons btn btn-primary w-100 mb-2"><FontAwesomeIcon icon={faGraduationCap} /> My Classes</button>
                                    </NavLink>
                                    <NavLink to="/add-review">
                                        <button
                                            onClick={() => {
                                                handleOffCanvasClose();
                                            }}
                                            className="drawer-buttons btn btn-primary w-100 mb-2"><FontAwesomeIcon icon={faPen} /> Add Review</button>
                                    </NavLink>
                                    <NavLink to="/make-admin">
                                        <button
                                            onClick={() => {
                                                handleOffCanvasClose();
                                            }}
                                            className="drawer-buttons btn btn-primary w-100 mb-2"><FontAwesomeIcon icon={faUserPlus} /> Make Admin</button>
                                    </NavLink>
                                    <NavLink to="/add-course">
                                        <button onClick={() => {
                                            handleOffCanvasClose();
                                        }}
                                            className="drawer-buttons btn btn-primary w-100 mb-2"><FontAwesomeIcon icon={faPlus} /> Add Course</button>
                                    </NavLink>
                                    <button onClick={() => {
                                        logOut();
                                        handleOffCanvasClose();
                                    }} className="btn btn-dark w-100"><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</button>


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
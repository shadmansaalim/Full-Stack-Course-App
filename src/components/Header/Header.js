import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const Header = () => {
    return (
        <Navbar className="shadow-lg mb-5" expand="lg">
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
                    <Nav className="ms-auto">
                        <NavLink className="text-decoration-none text-dark me-lg-3" exact to="/home">Home</NavLink>
                        <NavLink className="text-decoration-none text-dark me-lg-3" exact to="/services">Services</NavLink>
                        <NavLink className="text-decoration-none text-dark" exact to="/about">About</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
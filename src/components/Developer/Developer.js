import React from 'react';
import coding from '../../images/coding.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';


const Developer = () => {
    return (
        <section className="col-lg-5 col-md-8 col-10 mx-auto" style={{ marginTop: 80, marginBottom: 100 }}>
            <img className="img-fluid" src={coding} alt="" />
            <p className="mt-4">Hi! My name is Saalim Shadman and I am a Computer Science student at RMIT Australia. This is a Full Stack Web Application which is built using ReactJs, NodeJs, ExpressJs and MongoDB. This is a simple course based app where users can buy courses and add them to their class and for payment integration I used Stripe. Users also can give reviews to course that they purchased. I also secured the routes using Private Route and for double security layer used JWT Token on the backend. The Application is fully responsive for all devices and I also tried to implement some User Centred Design ideas to build an application with good UI/UX.</p>
            <small className="text-center fw-bold">#SoftwareEnthusiast</small>
            <br />

            <a target="_blank" rel="noreferrer" href="https://github.com/shadmansaalim" className="btn btn-outline-primary btn-lg mt-3">About me <FontAwesomeIcon icon={faCode} /></a>

        </section>
    );
};

export default Developer;
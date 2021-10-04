import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

const About = () => {
    return (
        <section>
            <Container>
                <section style={{ marginTop: 120 }} className="mb-5">
                    <Row className="d-flex align-items-center">
                        <Col lg="6">
                            <p>Udemy partners with more than 200 leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide. We offer a range of learning opportunities—from hands-on projects and courses to job-ready certificates and degree programs.</p>
                        </Col>
                        <Col lg="6">
                            <img className="img-fluid" src="https://images.ctfassets.net/00atxywtfxvd/4vOWgNjy4KExR8msqHnJEP/bb1557d60e8a29f6a5f09148f700bff5/partner-logos.png" alt="" />
                        </Col>
                    </Row>
                </section>

            </Container>
            <section className="bg-dark text-white p-3" style={{ marginTop: 120 }}>
                <Carousel>
                    <Carousel.Item>
                        <Row className="d-flex justify-content-around align-items-center">
                            <Col lg="6" className="text-start">
                                <h2><b>Campuses</b> are equipping students with in-demand career skills.</h2>
                                <p>"Udemy helps to level the playing field for all of our students. They gain skills and experiences that are highly sought after in the global marketplace."</p>
                                <b>Peter Szakál</b>,
                                <p>Director of Academic Affairs, University of Szeged</p>
                            </Col>
                            <Col lg="5">
                                <img className="img-fluid" src="https://images.ctfassets.net/00atxywtfxvd/16FsqBBwIIfQ898UOiqdJk/bfbb7b53404178e8beed001acd251888/campuses-career-skills-c.png" alt="" />
                            </Col>
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row className="d-flex justify-content-around align-items-center">
                            <Col lg="6" className="text-start">
                                <h2><b>Companies</b> are promoting skill development for their employees.</h2>
                                <p>"We love that the Coursera platform allows us to provide a breadth of high-quality programs and a learning experience that our employees can self-select into to drive their own personal development.”</p>
                                <b>Laurent Reich</b>,
                                <p>Learning Practice International Director, L'Oréal </p>
                            </Col>
                            <Col lg="5">
                                <img className="img-fluid" src="https://images.ctfassets.net/00atxywtfxvd/61Yp3VA21efy2YkTjYefXB/ca1408af7649c2863cac9451d65faee9/companies-skills-c-crunch.png" alt="" />
                            </Col>
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row className="d-flex justify-content-around align-items-center">
                            <Col lg="6" className="text-start">
                                <h2><b>Government agencies</b> are preparing their citizens for the future of work. </h2>
                                <p>“Together with Coursera, we identified courses tailored to the needs of the Abu Dhabi government. Our partnership has provided us with access to a vast library of courses that develop the most in-demand skills for the future.” </p>
                                <b>Her Excellency Alia Abdulla Al Mazrouei</b>,
                                <p>Acting Director-General of the Abu Dhabi School of Government</p>
                            </Col>
                            <Col lg="5">
                                <img className="img-fluid" src="https://images.ctfassets.net/00atxywtfxvd/2eqUCMsJU5g3grCyVW8HkK/57de09f48fa11181d961c9a4bc615c3d/government-agencies-c.png" alt="" />
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
            </section>
        </section>
    );
};

export default About;
import React from 'react';
import './About.css'; // Import the CSS file
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Testimonials from '../../components/Testimonials';
import ValueProposition from '../../components/Whychooseus';
// import teamImage from './images/team.jpg'; // Import team image
// import missionImage from './images/mission.jpg'; // Import mission image
// import whyChooseUsImage from './images/why-choose-us.jpg'; // Import why choose us image

const About = () => {
    return (
        <>
            <Header />
            <div className="about-page">
                <div className="about-hero" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/faq-bg.png'})` }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>About Us</h1>
                            <p>We are passionate about helping you find the perfect domain for your online journey.</p>
                        </div>
                        <div className="hero-image">
                            <img src={process.env.PUBLIC_URL + '/about-img.png'} alt="Hero" />
                        </div>
                    </div>
                </div>

                <div className="about-content">
                    <div className="about-section mission">
                        <div className="section-image">
                            <img src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Our Mission" />
                        </div>
                        <div className="section-text">
                            <h2>Our Mission</h2>
                            <p>
                                Our mission is to provide a seamless and user-friendly experience for finding and registering
                                domain names. We believe that the right domain can make all the difference in building a
                                successful online presence.
                            </p>
                        </div>
                    </div>

                    <div className="about-section team">
                        <div className="section-image">
                            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Our Team" />
                        </div>
                        <div className="section-text">
                            <h2>Our Team</h2>
                            <p>
                                Our team consists of experienced professionals in the domain industry, dedicated to helping
                                you find the perfect domain name. We are here to support you every step of the way.
                            </p>
                        </div>
                    </div>

                    {/* <div className="about-section why-choose-us">
                        <div className="section-image">
                            <img src={process.env.PUBLIC_URL + '/home-img.png'} alt="Why Choose Us" />
                        </div>
                        <div className="section-text">
                            <h2>Why Choose Us?</h2>
                            <ul>
                                <li>Wide selection of domain extensions</li>
                                <li>Affordable pricing</li>
                                <li>24/7 customer support</li>
                                <li>Secure and reliable service</li>
                            </ul>
                        </div>
                    </div> */}
                    <ValueProposition/>
                </div>
                
                <div className="about-cta">
                    <h2>Ready to Find Your Perfect Domain?</h2>
                    <button className="cta-button"><Link to={'/domainList'}>Get Started</Link></button>
                </div>

                <div style={{ background: "red", width:"100%" }}>
                    <Testimonials />
                </div>

            </div>
            <Footer />
        </>
    );
};

export default About;
import React from "react";
import "./Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

const Contact = () => {
    return (
        <>
            <Header />
            <div className="contact-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Contact Us</h1>
                        <p>We're here to help! Reach out to us for any queries or support.</p>
                    </div>
                    <div className="hero-image">
                        <img src={process.env.PUBLIC_URL + '/inner-banner-img1.png'} alt="Contact Hero" />
                    </div>
                </div>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <div className="contact-card">
                        <FaEnvelope className="icon" />
                        <h3>Email Us:</h3>
                        <p>domains@idirect.com</p>
                        {/* <p>support@domlea.com</p> */}
                    </div>

                    <div className="contact-card">
                        <FaPhoneAlt className="icon" />
                        <h3>Call Us:</h3>
                        <p>+1 (416)951-2158</p>
                        {/* <p>Tel. + (124) 1523-567-9874</p> */}
                    </div>

                    <div className="contact-card">
                        <FaMapMarkerAlt className="icon" />
                        <h3>Canada</h3>
                        {/* <p>55 Ontario St S, Milton, ON L9T 2M3, Canada</p> */}
                    </div>

                    {/* <div className="contact-card">
                        <FaHeadset className="icon" />
                        <h3>24/7</h3>
                        <p>We Are Working 24/7 </p>
                    </div> */}
                </div>

                <div className="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4117.187374672627!2d-79.87751007174559!3d43.517579002790534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b6fa0ad051003%3A0x4da58ebcb24c0d51!2s55%20Ontario%20St%20S%2C%20Milton%2C%20ON%20L9T%202M3%2C%20Canada!5e1!3m2!1sen!2sin!4v1741364807730!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="ce"></iframe>
                </div>
            </div>
            <div className="contact-form-container">
                <h2>Contact Us</h2>
                <form>
                    <div className="form-row">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            // value={formData.name}
                            // onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            // value={formData.email}
                            // onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Your Phone"
                        // value={formData.phone}
                        // onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder="Your Subject"
                        // value={formData.subject}
                        // onChange={handleChange}
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        // value={formData.message}
                        // onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" className="contact_btn">Send Message</button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default Contact;

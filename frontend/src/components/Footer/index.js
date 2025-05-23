// Footer.jsx
import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Footer = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter an email address');
            return;
        }
    
        try {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_API_URL}/users/subscribe`, { email });
            
            // Success notification with custom style
            toast.success('🎉 Thank you for subscribing!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: { 
                    background: '#4BB543', 
                    color: 'white',
                    fontSize: '16px'
                }
            });
            
            setEmail('');
        } catch (error) {
            // Error notification
            toast.error('⚠️ Subscription failed. Please try again.', {
                position: "top-center",
                style: {
                    background: '#FF4444',
                    color: 'white'
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img
                            src={process.env.PUBLIC_URL + '/footer-logo.png'}
                            alt="Logo"
                        />
                        <p className="tagline">Your Gateway to Digital Success</p>
                        <div className="social-links">
                            <a href="#" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            {/* Add other social icons similarly */}
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/domainList">Domains</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Policies</h4>
                        <ul>
                            {/* <li><a href="/domainList">Domain Search</a></li> */}
                            <li><a href="/terms">Terms and Conditions</a></li>
                            {/* <li><a href="/">SSL Certificates</a></li> */}
                            {/* <li><a href="/">Domain Transfer</a></li> */}
                        </ul>
                    </div>

                    {/* <div className="footer-column">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/report">Report Abuse</a></li>
                        </ul>
                    </div> */}

                    <div className="footer-column">
                        <h4>Newsletter</h4>
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} Domlea. Designed by <Link to={'https://gurmaanitservices.com'} className='copyright_link'>Gurmaan IT services</Link></p>
                    <div className="payment-methods">
                        {/* Add payment method icons */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
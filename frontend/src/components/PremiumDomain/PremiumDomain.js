import React, { useEffect, useState } from 'react';
import './PremiumDomains.css';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const PremiumDomains = () => {
    const [domain, setDomain] = useState(null);
    const [loading, setLoading] = useState(true);
    const { ref, inView } = useInView({ threshold: 0.1 });
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [showBuyNowModal, setShowBuyNowModal] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        offerPrice: '',
        domain: ''
    });

    const handleOfferClick = (domain) => {
        setSelectedDomain(`${domain.name}${domain.tld}`);
        setShowOfferModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/submit-offer`, {
                ...formData,
                domain: selectedDomain
            });
            alert('Offer submitted successfully!');
            setShowOfferModal(false);
            setFormData({ name: '', email: '', mobile: '' });
        } catch (error) {
            alert('Error submitting offer');
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    useEffect(() => {
        const fetchPremiumDomain = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/premium-domains`);
                // Check if there's at least one premium domain
                if (response.data.data.length > 0) {
                    setDomain(response.data.data[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching premium domain:', error);
                setLoading(false);
            }
        };
        fetchPremiumDomain();
    }, [domain]);

    // Don't render anything if there's no premium domain
    if (!loading && !domain) return null;

    return (
        <>
            {/* ===========make an offer modal================= */}
            {showOfferModal && (
                <div className="modal-overlay" onClick={() => setShowOfferModal(false)}>
                    <div className="offer-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Make an Offer to Purchase this Domain Name</h3>
                        <form className="offer-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    onChange={handleChange}
                                    value={formData.name}
                                    autoComplete='off'
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleChange}
                                    value={formData.email}
                                    autoComplete='off'
                                />
                            </div>
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    required
                                    onChange={handleChange}
                                    value={formData.mobile}
                                    autoComplete='off'
                                />
                            </div>
                            <div className="form-group">
                                <label>Offer Price in $USD</label>
                                <input
                                    type="text"
                                    name="offerPrice"
                                    required
                                    onChange={handleChange}
                                    value={formData.offerPrice}
                                    autoComplete='off'
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: "flex", alignItems: "center" }}>
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                        style={{ marginRight: '8px', width: '15px', height: '15px' }}
                                    />
                                    I agree to the
                                    <Link to="/terms" target="_blank" style={{ color: '#0984e3', marginLeft: '4px' }}>
                                        Terms & Conditions
                                    </Link>
                                </label>
                            </div>
                            <p style={{ fontSize: "15px" }}>
                                <strong>Please note:</strong> We believe that choosing the <Link to={'https://escrow.com'} target='_blank'><span style={{ textDecoration: "underline" }}>Buy Now</span></Link> option is the most reliable way to secure this domain name. Entering into negotiations may result in losing the opportunity to acquire the Domain name at the current asking price. The Domain seller reserves the right to modify the asking price at any time without prior notice.
                                Rest assured, your contact information is kept strictly confidential, we do not share or sell your details under any circumstances.
                            </p>
                            <div className="modal-buttons">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 transition-all transform "
                                    style={{ flex: 1 }}
                                >
                                    Submit your Best Offer
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="domain-container" ref={ref}>
                <AnimatePresence>
                    <h1 className='premium-domain-heading'>Domain of the Day</h1>
                    {loading ? (
                        <motion.div
                            className="advanced-loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="holographic-loader"></div>
                        </motion.div>
                    ) : (
                        domain && (
                            <motion.div
                                className="domain-layout"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="domain-hero">
                                    <div className="domain-header">
                                        <span className="domain-status">Ultra Premium Domain</span>
                                        <motion.h1
                                            className="domain_name"
                                            animate={inView ? { x: 0 } : { x: -50 }}
                                        >
                                            {domain.name}
                                            <span className="domain-tld">{domain.tld}</span>
                                        </motion.h1>
                                    </div>

                                    <motion.div
                                        className="price-bubble"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="price-content">
                                            <span className='amount-discount'>10% Discount!</span>
                                            <div className="price-inner-div">
                                                <img
                                                    src={`https://flagcdn.com/16x12/${domain.countryCode}.png`}
                                                    alt={domain.currency}
                                                    style={{ width: '20px', height: '16px', marginRight: "5px" }}
                                                />
                                                <span className="amount">
                                                    {domain.price.toLocaleString()}</span>
                                                <span className="currency">{domain.currency}</span>
                                            </div>
                                        </div>
                                        <div className="price-aura"></div>

                                    </motion.div>
                                </div>

                                
                                {/* =================Buttons div================= */}
                                <div className="flex sm:flex-row gap-8" id='btn_div' style={{display:"flex", justifyContent:"space-between", marginBottom:"20px", padding:"0 30px"}}>
                                    {/* <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-3 py-1 rounded-lg font-base text-base transition-all transform ">
                                            <Link to={'https://www.escrow.com/?PID=54867'} target='_blank'>Buy Now</Link>
                                        </button> */}
                                    <button
                                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-3 py-1 rounded-md font-base text-base transition-all transform "
                                        onClick={() => setShowBuyNowModal(true)}
                                    >
                                        Buy Now
                                    </button>
                                    <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-3 py-1 rounded-md font-base text-base transition-all">
                                        <button onClick={() => handleOfferClick(domain)}>Make an Offer</button>
                                    </button>
                                </div>

                                <div className="domain-body">
                                    <motion.div
                                        className="cta-container"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="security-assurance">
                                            <svg viewBox="0 0 24 24">
                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                            </svg>
                                            Verified & Secured Transaction
                                        </div>
                                    </motion.div>
                                        <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-3 py-1 rounded-md font-base text-base transition-all mt-3">
                                        <Link to={'/domainList'}>Domain Inventory</Link>
                                    </button>
                                </div>
                            </motion.div>
                        )
                    )}
                </AnimatePresence>

                {/* ===========buy now modal================= */}
                {showBuyNowModal && (
                    <div className="modal-overlay" onClick={() => setShowBuyNowModal(false)}>
                        <div className="buynow-modal" onClick={(e) => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h2 className="modal-title">Secure This Domain</h2>
                                <button
                                    className="modal-close-btn"
                                    onClick={() => setShowBuyNowModal(false)}
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="modal-content">
                                <div className="contact-card">
                                    <div className="icon-container bg-blue-100">
                                        <svg className="contact-icon" viewBox="0 0 24 24">
                                            <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                                        </svg>
                                    </div>
                                    <div className="contact-details">
                                        <h3 className="contact-title">Direct Purchase Assistance</h3>
                                        <p className="contact-subtitle">Our domain experts are ready to help</p>

                                        <div className="contact-method">
                                            <svg className="method-icon" viewBox="0 0 24 24">
                                                <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                                            </svg>
                                            <div>
                                                <p className="method-label">24/7 Support Line</p>
                                                <p className="method-value">+1 (416) 951-2158</p>
                                            </div>
                                        </div>

                                        <div className="contact-method">
                                            <svg className="method-icon" viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                            </svg>
                                            <div>
                                                <p className="method-label">Email Support</p>
                                                <p className="method-value">domains@idirect.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        className="modal-confirm-btn"
                                        onClick={() => setShowBuyNowModal(false)}
                                    >
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </>
    );
};

export default PremiumDomains;
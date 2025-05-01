import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import './DomainDetail.css';
import KeyFeatures from '../../components/keyFeatures';

const DomainDetails = () => {
    const { domainName } = useParams();
    const [domain, setDomain] = useState(null);
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
        const fetchDomain = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/${domainName}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
                );
                setDomain(response.data.data);
            } catch (error) {
                console.error('Error fetching domain:', error);
            }
        };
        fetchDomain();
    }, [domainName]);


    if (!domain) return
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className='loader'>

        </div>
    </div>;

    return (
        <>
            <Header />

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
                            {/* <p style={{ fontSize: "15px" }}>
                                Please note we feel <Link to={'https://escrow.com'} target='_blank'><span style={{ textDecoration: "underline" }}>Buy Now</span></Link> is the best option to secure the domain name. If you negotiate, then you may lose your chance to secure Domain for asking price. We reserve the right to change the asking price any time without any notice. Your contact information is secure with us, we do not share or sell the information.
                            </p> */}
                            <div className="modal-buttons">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 transition-all transform "
                                    style={{ flex: 1 }}
                                >
                                    Submit your Best Offer
                                </button>
                                {/* <button
                                    type="button"
                                    className="makeOffer-button"
                                    style={{ backgroundColor: '#dc2626', flex: 1 }}
                                    onClick={() => setShowOfferModal(false)}
                                >
                                    Cancel
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Premium Badge */}
                    {domain.isPremium && (
                        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full inline-flex items-center absolute top-6 right-6" id='premium-domain'>
                            <span className="mr-2">⭐</span>
                            Premium Domain
                        </div>
                    )}

                    {/* Domain Header */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-8 text-center bg-gradient-to-b from-gray-50 to-white detail-domain-name">
                            <div className='domain-header-top-right'>
                                <h1>You are in luck!</h1>
                                <p className="text-sm text-gray-600">Domain is available for your business venture.</p>
                                <p className="text-sm text-gray-600">Snap it before your competitors.</p>
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-4 domain-title">
                                {domain.name}
                                <span className="text-blue-600">{domain.tld}</span>
                            </h1>
                            <div className="inline-block bg-blue-100 text-blue-800 px-6 py-3 rounded-lg" style={{ width: "200px" }}>
                                <span style={{ marginBottom: "10px", fontSize: "16px" }}>Asking Price</span>
                                <div className='mt-1' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img
                                        src={`https://flagcdn.com/16x12/${domain.countryCode}.png`}
                                        alt={domain.currency}
                                        style={{ width: '20px', height: '16px', marginRight: "5px" }}
                                    />
                                    <span className="text-2xl font-bold">{domain.price}</span>
                                    <span className="ml-2 text-gray-600">{domain.currency}</span>
                                </div>
                            </div>
                        </div>

                        <div className='domain_desc_div'>
                            <p>
                                With us, you're not just purchasing a Domain name, you're gaining a partner dedicated to your success. We offer full-service support to help you launch, grow, and thrive with confidence. From website development and SEO to marketing, IT services, and expert guidance, we provide comprehensive business solutions. We’re here to help you build and scale your business from the ground up.
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="px-8 py-12 grid md:grid-cols-3 gap-12">
                            {/* Left Column */}
                            <div className="md:col-span-2 space-y-8">
                                <div className='domain-desc-btn-div'>
                                    <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium">
                                        {domain.category}
                                    </div>
                                    {/* Action Buttons */}
                                    <div className="flex sm:flex-row gap-8" id='btn_div' style={{ paddingRight: "50px" }}>
                                        {/* <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-3 py-1 rounded-lg font-base text-base transition-all transform ">
                                            <Link to={'https://www.escrow.com/?PID=54867'} target='_blank'>Buy Now</Link>
                                        </button> */}
                                        <button
                                            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-3 py-1 rounded-lg font-base text-base transition-all transform "
                                            onClick={() => setShowBuyNowModal(true)}
                                        >
                                            Buy Now
                                        </button>
                                        <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-3 py-1 rounded-lg font-base text-base transition-all">
                                            <button onClick={() => handleOfferClick(domain)}>Make an Offer</button>
                                        </button>
                                    </div>
                                </div>

                                <div className="domain-description">
                                    <h3 className="description-title">Key Features</h3>
                                    <ul className="features-list">
                                        {/* {domain.description.split('\n').map((point, index) => (
                                            point.trim() && (
                                                <li key={index} className="feature-item">
                                                    {point.trim()}
                                                </li>
                                            )
                                        ))} */}
                                        {(domain.description || '').split('\n').map((point, index) => (
                                            point.trim() && (
                                                <li key={index} className="feature-item">
                                                    {point.trim()}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                {/* <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-xl font-bold text-lg transition-all transform ">
                                        <Link to={'https://www.escrow.com'} target='_blank'>Buy Now</Link>
                                    </button>
                                    <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-bold text-lg transition-all">
                                        <button onClick={() => handleOfferClick(domain)}>Make an Offer</button>
                                    </button>
                                </div> */}
                            </div>

                            {/* Right Column - Meta Data */}
                            <div className="bg-gray-50 p-6 rounded-xl space-y-4" style={{ marginTop: "65px" }}>
                                <img
                                    src={process.env.PUBLIC_URL + '/domain2.jpg'}
                                    alt="Domain search"
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                                <div className="flex justify-between items-center">
                                    {/* <span className="text-gray-600">Status</span> */}
                                    <span className="text-green-600 font-medium">
                                        {domain.status}
                                        Active
                                    </span>
                                </div>
                                <h1 className='text-xl font-semibold'>Why do you need a Keyword-rich Domain?</h1>
                                <p className='text-base font-light'>
                                    Your domain name is your identity, any individual, business or organization planning to have an Internet presence, should invest in a keyword-rich domain name.
                                </p>
                                <p className='text-base font-light'>
                                    Having your own strong and easy-to-remember domain name, website and email address will give you and your business creditability. Take Control of Your Business with a Keyword-Rich Domain Name.You can buy or lease this domain to grow your business. Keyword-rich domains can attract type-in traffic.
                                </p>
                                <p className='text-base font-light'>
                                    Approximately 20 percent of all search traffic comes from direct navigation, meaning people often type domain names directly into a browser's address bar, hoping to find relevant content.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


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

            <KeyFeatures />
            <Footer />
        </>
    );
};

export default DomainDetails;
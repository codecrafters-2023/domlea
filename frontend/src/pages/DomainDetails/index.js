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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                setDomain(response.data);
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
                            <p style={{ fontSize: "15px" }}>
                                Please note we feel <Link to={'https://escrow.com'} target='_blank'><span style={{ textDecoration: "underline" }}>Buy Now</span></Link> is the best option to secure the domain name.</p>
                            <p style={{ fontSize: "15px" }}>If you negotiate, then you may lose this price. We reserve the right to change the asking price without any notice. Your contact name and information are secure with us. We do not share or sell the info of potential domain buyers.
                            </p>
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
                        <div className="px-8 py-12 text-center bg-gradient-to-b from-gray-50 to-white">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4 domain-title">
                                {domain.name}
                                <span className="text-blue-600">{domain.tld}</span>
                            </h1>
                            <div className="inline-block bg-blue-100 text-blue-800 px-6 py-3 rounded-lg" style={{ width: "200px" }}>
                                <span style={{ marginBottom: "10px", fontSize: "16px" }}>Asking Price</span>
                                <div className='mt-1'>
                                    <span className="text-2xl font-bold">${domain.price}</span>
                                    <span className="ml-2 text-gray-600">USD</span>
                                </div>
                            </div>
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
                                        <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-3 py-1 rounded-lg font-base text-base transition-all transform ">
                                            <Link to={'https://www.escrow.com'} target='_blank'>Buy Now</Link>
                                        </button>
                                        <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-3 py-1 rounded-lg font-base text-base transition-all">
                                            <button onClick={() => handleOfferClick(domain)}>Make an Offer</button>
                                        </button>
                                    </div>
                                </div>

                                <div className="domain-description">
                                    <h3 className="description-title">Key Features</h3>
                                    <ul className="features-list">
                                        {domain.description.split('\n').map((point, index) => (
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
                            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
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
                                {/* <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                        <span className="text-gray-600">Registration Date</span>
                                        <span className="text-gray-900 font-medium">
                                            {new Date(domain.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                        <span className="text-gray-600">Last Updated</span>
                                        <span className="text-gray-900 font-medium">
                                            {new Date(domain.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Status</span>
                                        <span className="text-green-600 font-medium">
                                            {domain.status}
                                            Active
                                        </span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <KeyFeatures />
            <Footer />
        </>
    );
};

export default DomainDetails;
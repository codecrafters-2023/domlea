import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import './DomainDetail.css';

const DomainDetails = () => {
    const { domainName } = useParams();
    const [searchParams] = useSearchParams();
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

    const [results, setResults] = useState({
        exactMatch: null,
        relatedDomains: []
    });
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/search-domains`,
                    { params: Object.fromEntries(searchParams) }
                );
                setResults(response.data);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [searchParams]);

    if (!domain) return <div className='loader-div'>
        <div class="ui-loader loader-blk">
            <svg viewBox="22 22 44 44" class="multiColor-loader">
                <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
            </svg>
        </div>
    </div>;

    return (
        <>
            <Header />

            {showOfferModal && (
                <div className="modal-overlay" onClick={() => setShowOfferModal(false)}>
                    <div className="offer-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Your Best Offer</h3>
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
                                <label>Offer Price</label>
                                <input
                                    type="text"
                                    name="offerPrice"
                                    required
                                    onChange={handleChange}
                                    value={formData.offerPrice}
                                    autoComplete='off'
                                />
                            </div>
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
                        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full inline-flex items-center absolute top-6 right-6 mt-28">
                            <span className="mr-2">⭐</span>
                            Premium Domain
                        </div>
                    )}

                    {/* Domain Header */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-8 py-12 text-center bg-gradient-to-b from-gray-50 to-white">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                                {domain.name}
                                <span className="text-blue-600">{domain.tld}</span>
                            </h1>
                            <div className="inline-block bg-blue-100 text-blue-800 px-6 py-3 rounded-full">
                                <span className="text-3xl font-bold">${domain.price}</span>
                                <span className="ml-2 text-gray-600">USD</span>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="px-8 py-12 grid md:grid-cols-3 gap-12">
                            {/* Left Column */}
                            <div className="md:col-span-2 space-y-8">
                                <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium">
                                    {domain.category}
                                </div>

                                <div className="domain-description">
                                    <h3 className="description-title">Key Features</h3>
                                    <ul className="features-list">
                                        {domain.description.split('\n').map((point, index) => (
                                            point.trim() && (
                                                <li key={index} className="feature-item">
                                                    {/* <svg className="feature-icon" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg> */}
                                                    {point.trim()}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-xl font-bold text-lg transition-all transform ">
                                        <Link to={'https://www.escrow.com'} target='_blank'>Buy Now</Link>
                                    </button>
                                    <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-bold text-lg transition-all">
                                        <button onClick={() => handleOfferClick(domain)}>Make an Offer</button>
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Meta Data */}
                            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                                <div className="space-y-4">
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
                                            {/* {domain.status} */}
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="results-container">
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <>
                        {results.relatedDomains.length > 0 && (
                            <div className="related-domains-section">
                                <h3 className='text-xl font-semibold'>Related Domains</h3>
                                <div className="domain-grid">
                                    {results.relatedDomains.map((domain) => (
                                        <Link to={`/${domain.name}${domain.tld}`}>
                                            <div key={domain._id} className="domain-card">
                                                <div className="domain-header">
                                                    <h3>
                                                        {domain.name}
                                                        <span className="tld">{domain.tld}</span>
                                                    </h3>
                                                    <div className="domain-price">
                                                        ${domain.price}
                                                        <span style={{ fontSize: "14px", color: "#000" }}>USD</span>
                                                    </div>
                                                </div>
                                                <div className="domain-body">
                                                    <p className="category">
                                                        Category: {domain.category}
                                                    </p>
                                                    <div className='exactMatch_btn_div'>
                                                        {/* <buton><Link to={`/${domain.name}${domain.tld}`}>More Detail</Link></buton> */}
                                                        {/* <button className="buy-button">
                                                                            <Link to={'https://www.escrow.com'}>Buy Now</Link>
                                                                        </button>
                                                                        <button className="makeOffer-button" onClick={() => handleOfferClick(domain)}>
                                                                            Make an Offer
                                                                        </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results Message */}
                        {!results.exactMatch && results.relatedDomains.length === 0 && (
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "50px 0" }}>
                                <div className="no-results">
                                    No domains found matching your criteria
                                </div>
                                <button className='backToSearch_btn'><Link to={'/'}>Back to Search</Link></button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default DomainDetails;
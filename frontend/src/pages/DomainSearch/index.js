import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import './DomainSearch.css';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';

const SearchDomain = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState({
        exactMatch: null,
        relatedDomains: []
    });
    const [loading, setLoading] = useState(true);

    const [showOfferModal, setShowOfferModal] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        // subject: '',
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

    return (
        <div className="search-results-page">
            <Header />
            <div className="results-container">

            {showOfferModal && (
                    <div className="modal-overlay">
                        <div className="offer-modal">
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
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        onChange={handleChange}
                                        value={formData.subject}
                                    />
                                </div> */}
                                <div className="modal-buttons">
                                    <button
                                        type="submit"
                                        className="buy-button"
                                        style={{ flex: 1 }}
                                    >
                                        Submit Offer
                                    </button>
                                    <button
                                        type="button"
                                        className="makeOffer-button"
                                        style={{ backgroundColor: '#dc2626', flex: 1 }}
                                        onClick={() => setShowOfferModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                <h2>Search Results for "{searchParams.get('search')}"</h2>

                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <>
                        {/* Exact Match Section */}
                        {results.exactMatch && (
                            <div className="exact-match-section" style={{ width: "800px" }}>
                                <h3>Exact Match</h3>
                                <div className="exact-domain-card highlighted">
                                    <div className="domain-header">
                                        <h3>
                                            {results.exactMatch.name}
                                            <span className="tld">{results.exactMatch.tld}</span>
                                        </h3>
                                        <div className="domain-price">
                                            ${results.exactMatch.price}
                                        </div>
                                    </div>
                                    <div className="domain-body">
                                        <p className="category">
                                            Category: {results.exactMatch.category}
                                        </p>
                                        <div className='exactMatch_btn_div'>
                                            <button className="buy-button">
                                            <Link to={'https://www.escrow.com'}>Buy Now</Link>
                                            </button>
                                            <button className="makeOffer-button" onClick={() => handleOfferClick(results.exactMatch)}>
                                                Make an Offer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Related Domains Section */}
                        {results.relatedDomains.length > 0 && (
                            <div className="related-domains-section">
                                <h3>Related Domains</h3>
                                <div className="domain-grid">
                                    {results.relatedDomains.map((domain) => (
                                        <div key={domain._id} className="domain-card">
                                            <div className="domain-header">
                                                <h3>
                                                    {domain.name}
                                                    <span className="tld">{domain.tld}</span>
                                                </h3>
                                                <div className="domain-price">
                                                    ${domain.price}
                                                </div>
                                            </div>
                                            <div className="domain-body">
                                                <p className="category">
                                                    Category: {domain.category}
                                                </p>
                                                <div className='exactMatch_btn_div'>
                                                    <button className="buy-button">
                                                        <Link to={'https://www.escrow.com'}>Buy Now</Link>
                                                    </button>
                                                    <button className="makeOffer-button" onClick={() => handleOfferClick(domain)}>
                                                        Make an Offer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results Message */}
                        {!results.exactMatch && results.relatedDomains.length === 0 && (
                            <div className="no-results">
                                No domains found matching your criteria
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchDomain;
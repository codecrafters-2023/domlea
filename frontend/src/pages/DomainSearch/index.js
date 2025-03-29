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

    console.log(results);

    // const [showOfferModal, setShowOfferModal] = useState(false);
    // const [selectedDomain, setSelectedDomain] = useState('');
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     mobile: '',
    //     offerPrice: '',
    //     domain: ''
    // });

    // const handleOfferClick = (domain) => {
    //     setSelectedDomain(`${domain.name}${domain.tld}`);
    //     setShowOfferModal(true);
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post(`${process.env.REACT_APP_API_URL}/users/submit-offer`, {
    //             ...formData,
    //             domain: selectedDomain
    //         });
    //         alert('Offer submitted successfully!');
    //         setShowOfferModal(false);
    //         setFormData({ name: '', email: '', mobile: '' });
    //     } catch (error) {
    //         alert('Error submitting offer');
    //     }
    // };

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // };


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


                <div className='flex justify-center items-center gap-5'>
                <h2>Search Results for "{searchParams.get('search')}"</h2>
                <div className='flex justify-end mt-3'>
                    <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-3 py-1 rounded-sm font-base text-base transition-all"><Link to={'/'}>Search Again</Link></button>
                </div>
                </div>

                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <>
                        {/* Exact Match Section */}
                        {results.exactMatch && (
                            <div className="exact-match-section" style={{ width: "800px" }}>
                                <h3>Exact Match</h3>
                                <Link to={`/${results.exactMatch.name}${results.exactMatch.tld}`}>
                                    <div className="exact-domain-card highlighted">
                                        <div className="domain-header">
                                            <h3>
                                                {results.exactMatch.name}
                                                <span className="tld">{results.exactMatch.tld}</span>
                                            </h3>
                                            <div className="domain-price">
                                                <span style={{ fontSize: "15px", color: "#2563eb" }}>Asking Price</span>
                                                <div>
                                                    ${results.exactMatch.price}
                                                    <span style={{ fontSize: "14px", color: "#000" }}>USD</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="domain-body">
                                            <p className="category">
                                                Category: {results.exactMatch.category}
                                            </p>
                                            <div className='exactMatch_btn_div'>
                                                {/* <buton><Link to={`/${results.exactMatch.name}${results.exactMatch.tld}`}>More Detail</Link></buton> */}
                                                {/* <button className="buy-button">
                                                <Link to={'https://www.escrow.com'}>Buy Now</Link>
                                            </button>
                                            <button className="makeOffer-button" onClick={() => handleOfferClick(results.exactMatch)}>
                                                Make an Offer
                                            </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Related Domains Section */}
                        {results.relatedDomains.length > 0 && (
                            <div className="related-domains-section">
                                <h3>Related Domains</h3>
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
                                                        <span style={{ fontSize: "15px", color: "#2563eb" }}>Asking Price</span>
                                                        <div>
                                                            ${domain.price}
                                                            <span style={{ fontSize: "14px", color: "#000" }}>USD</span>
                                                        </div>
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
        </div >
    );
};

export default SearchDomain;
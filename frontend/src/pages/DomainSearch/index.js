


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
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
                <h2>Search Results for "{searchParams.get('search')}"</h2>

                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <>
                        {/* Exact Match Section */}
                        {results.exactMatch && (
                            <div className="exact-match-section">
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
                                        <button className="buy-button">
                                            Purchase Now
                                        </button>
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
                                                <button className="view-details">
                                                    View Details
                                                </button>
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
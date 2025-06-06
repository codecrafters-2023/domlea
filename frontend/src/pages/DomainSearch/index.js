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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/search-domains`,
                    {
                        params: {
                            ...Object.fromEntries(searchParams),
                            page: currentPage,
                        }
                    }
                );
                setResults(response.data);
                setTotalPages(response.data.pages);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [searchParams, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="search-results-page">
            <Header />
            <div className="results-container">



                <div className='flex justify-center items-baseline gap-5'>
                    <h2>Search Results for "{searchParams.get('search')}"</h2>
                    <div className='flex justify-end mt-3 gap-2'>
                        <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-3 py-1 rounded-sm font-base text-base transition-all"><Link to={'/'}>Search Again</Link></button>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-3 py-1 rounded-sm font-base text-base transition-all"><Link to={'/domainList'}>Domains List</Link></button>
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
                                                    <span style={{ fontSize: "14px", color: "#000" }}>{results.exactMatch.currency}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="domain__body">
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
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <img
                                                                src={`https://flagcdn.com/16x12/${domain.countryCode}.png`}
                                                                alt={domain.currency}
                                                                style={{ width: '20px', height: '16px', marginRight: "5px" }}
                                                            />
                                                            {domain.price}
                                                            <span style={{ fontSize: "14px", color: "#000" }}>{domain.currency}</span>
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
                                {/* <button className='backToSearch_btn'><Link to={'/'}>Back to Search</Link></button> */}
                            </div>
                        )}
                    </>
                )}
                {!loading && totalPages > 1 && (
                    <div className="pagination flex justify-center gap-4 my-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                        >
                            Previous
                        </button>

                        <span className="self-center text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div >
    );
};

export default SearchDomain;
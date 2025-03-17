import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DomainListing.css";
import Header from "../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const DomainListing = () => {
    const [domains, setDomains] = useState([]);
    const [search, setSearch] = useState("");
    const [tld, setTld] = useState("");
    const [tlds, setTlds] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Added applied filters state
    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        tld: "",
        minPrice: "",
        maxPrice: "",
    });

    // Fetch TLDs (unchanged)
    useEffect(() => {
        const fetchTlds = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all-tlds`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTlds(response.data.data);
            } catch (error) {
                console.error("Error fetching TLDs:", error);
            }
        };
        fetchTlds();
    }, []);

    // Fetch domains with applied filters
    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/userDomainsList`, {
                    params: {
                        ...appliedFilters,
                        page,
                        limit
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDomains(response.data.data);
                setTotal(response.data.total);
                setPages(response.data.pages);
            } catch (error) {
                console.error("Error fetching domains:", error);
            }
        };
        fetchDomains();
    }, [appliedFilters, page, limit]);

    // Handle Apply Filters
    const handleApplyFilters = () => {
        setAppliedFilters({
            search,
            tld,
        });
        setPage(1); // Reset to first page
    };

    // Handle Remove Filters
    const handleRemoveFilters = () => {
        setSearch("");
        setTld("");
        setAppliedFilters({
            search: "",
            tld: "",
        });
        setPage(1);
    };

    if (!domains) return <div className='loader-div'>
        <div class="ui-loader loader-blk">
            <svg viewBox="22 22 44 44" class="multiColor-loader">
                <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
            </svg>
        </div>
    </div>;

    return (
        <>
            <Header />
            <div className="domain-listing-container">
                <h1 className="domain-listing-title">Search Your Dream Domain</h1>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search Categories"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={tld} onChange={(e) => setTld(e.target.value)}>
                        <option value="">All TLDs</option>
                        {tlds.map((tldOption) => (
                            <option key={tldOption} value={tldOption}>
                                {tldOption}
                            </option>
                        ))}
                    </select>
                    <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                    {/* Added buttons */}
                    <button className="apply-button" onClick={handleApplyFilters}>
                        Apply Filters
                    </button>
                    <button className="remove-button" onClick={handleRemoveFilters}>
                        Remove Filters
                    </button>
                </div>
                <div className="domain-card-container">
                    {domains.length > 0 ? (
                        domains.map((domain) => (
                            <Link to={`/${domain.name}${domain.tld}`} className="domain-card-link">
                                <div key={domain._id} className="domain_card">
                                    <img
                                        src={domain.imageUrl}
                                        alt={`${domain.name}${domain.tld}`}
                                    />
                                    <hr />
                                    <div className="domain-card-content">
                                        <div className="domain-name-price-div">
                                            <h3>{domain.name}{domain.tld}</h3>
                                            <div className="domain-price">${domain.price}</div>
                                        </div>
                                        {/* <div className="domain-date">
                                        Listed on: {new Date(domain.createdAt).toLocaleDateString()}
                                    </div> */}
                                    </div>
                                    {/* <div className="domain-card-actions">
                                    <button className="buy-button">
                                        <Link to={'/contact'}>Buy Now</Link>
                                    </button>
                                    <button className="buy-button">
                                        <Link to={'/contact'}>Make an Offer
                                        </Link>
                                    </button>
                                </div> */}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="no-results">No domains found.</p>
                    )}
                </div>
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {pages}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === pages}
                    >
                        Next
                    </button>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default DomainListing;
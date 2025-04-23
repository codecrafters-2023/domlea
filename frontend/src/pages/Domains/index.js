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
    const [limit, setLimit] = useState(52);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [lengthFilter, setLengthFilter] = useState("");

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
                setLoading(false);
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
            length: lengthFilter // Add this
        });
        setPage(1);
    };

    // Handle Remove Filters
    const handleRemoveFilters = () => {
        setSearch("");
        setTld("");
        setLengthFilter("");
        setLimit(52);
        setAppliedFilters({
            search: "",
            tld: "",
            length: "" // Add this
        });
        setPage(1);
    };

    return (
        <>
            <Header />
            <div className="domain-listing-container">
                <h1 className="domain-listing-title">Search Your Dream Domain</h1>
                <div className="filters-section">
                    <div className="filters-header">
                        <h3 className="filter-title">Filter Domains</h3>
                        <div className="filter-actions">
                            <button className="filter-button apply-button" onClick={handleApplyFilters}>
                                <span>🔍</span> Apply
                            </button>
                            <button className="filter-button remove-button" onClick={handleRemoveFilters}>
                                <span>🗑️</span> Clear
                            </button>
                        </div>
                    </div>

                    <div className="filter-controls">
                        <div className="filter-group">
                            <label className="filter-label">Search by name</label>
                            <input
                                type="text"
                                className="filter-input"
                                placeholder="Start typing..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Domain ending (TLD)</label>
                            <select
                                className="filter-input filter-select"
                                value={tld}
                                onChange={(e) => setTld(e.target.value)}
                            >
                                <option value="">All TLDs</option>
                                {tlds.map((tldOption) => (
                                    <option key={tldOption} value={tldOption}>
                                        .{tldOption}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Name length</label>
                            <select
                                className="filter-input filter-select"
                                value={lengthFilter}
                                onChange={(e) => setLengthFilter(e.target.value)}
                            >
                                <option value="">Any length</option>
                                <option value="4">📏 Up to 4 letters</option>
                                <option value="8">📐 Up to 8 letters</option>
                                <option value="15">📏 Up to 15 letters</option>
                                <option value="20">📐 Up to 20 letters</option>
                                <option value="20+">📏 20+ letters</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Items per page</label>
                            <select
                                className="filter-input filter-select"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                            >
                                <option value={50}>50 domains</option>
                                <option value={75}>75 domains</option>
                                <option value={100}>100 domains</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="domain-card-container">
                    {loading ? (
                        <div className="loading-spinner">
                            {/* Add your preferred loading spinner */}
                            <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : domains.length > 0 ? (
                        domains.map((domain) => (
                            <Link to={`/${domain.name}${domain.tld}`} className="domain-card-link" key={domain._id}>
                                <div className="domain_card">
                                    {/* <img
                                        src={domain.imageUrl}
                                        alt={`${domain.name}${domain.tld}`}
                                    /> */}
                                    <hr />
                                    <div className="domain-card-content">
                                        <div className="domain-name-price-div">
                                            <h3>{domain.name}{domain.tld}</h3>
                                            <div className="domain-price">
                                                <img
                                                    src={`https://flagcdn.com/16x12/${domain.countryCode}.png`}
                                                    alt={domain.currency}
                                                    style={{ width: '20px', height: '16px', marginRight: "5px" }}
                                                />
                                                {domain.price} <span style={{ fontSize: "14px", margin: "0" }}>{domain.currency}</span></div>
                                        </div>
                                    </div>
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
            <Footer />
        </>
    );
};

export default DomainListing;
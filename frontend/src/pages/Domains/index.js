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
    const [limit, setLimit] = useState(20);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);

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
                        Clear Filters
                    </button>
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
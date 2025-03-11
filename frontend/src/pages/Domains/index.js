import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DomainListing.css";
import Header from "../../components/Navbar";
import { Link } from "react-router-dom";

const DomainListing = () => {
    const [domains, setDomains] = useState([]);
    const [search, setSearch] = useState("");
    const [tld, setTld] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [tlds, setTlds] = useState([]); // State to store all TLDs
    const [page, setPage] = useState(1); // Current page
    const [limit, setLimit] = useState(10); // Items per page
    const [total, setTotal] = useState(0); // Total number of domains
    const [pages, setPages] = useState(0); // Total number of pages


    // Fetch all TLDs from the backend
    useEffect(() => {
        const fetchTlds = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all-tlds`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTlds(response.data.data); // Set the fetched TLDs
            } catch (error) {
                console.error("Error fetching TLDs:", error);
            }
        };

        fetchTlds();
    }, []);

    // Fetch domains from the backend with pagination
    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/userDomainsList`, {
                    params: { search, tld, minPrice, maxPrice, page, limit },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDomains(response.data.data); // Set the fetched domains
                setTotal(response.data.total); // Set the total number of domains
                setPages(response.data.pages); // Set the total number of pages
            } catch (error) {
                console.error("Error fetching domains:", error);
            }
        };

        fetchDomains();
    }, [search, tld, minPrice, maxPrice, page, limit]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <Header />
            
            <div className="domain-listing-container">
                <h1 className="domain-listing-title">Search Your Dream domain</h1>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search domain name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={tld} onChange={(e) => setTld(e.target.value)}>
                        <option value="">All TLDs</option>
                        {tlds.map((tld) => (
                            <option key={tld} value={tld}>
                                {tld}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>
                <div className="domain-list">
                    {domains.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Domain Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {domains.map((domain) => (
                                    <tr key={domain._id}>
                                        <td className="domain-name">{domain.name}{domain.tld}</td>
                                        <td>{domain.description}</td>
                                        <td className="domain-price">${domain.price}</td>
                                        <td>
                                            <button className="buy-button"><Link to={'/contact'}>Contact Us</Link></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-results">No domains found.</p>
                    )}
                </div>
                {/* Pagination Controls */}
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
        </>
    );
};

export default DomainListing;
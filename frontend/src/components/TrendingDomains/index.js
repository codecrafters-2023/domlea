import React, { useState, useEffect } from "react";
import "./trending.css";
import { FaBusinessTime } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const TrendingDomains = () => {
    const [filter, setFilter] = useState("All");
    const [domains, setDomains] = useState([]);
    const [tlds, setTlds] = useState([]);

    // Fetch TLDs for premium domains
    useEffect(() => {
        const fetchTlds = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/tlds`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTlds(response.data.data); // Set the fetched TLDs
            } catch (error) {
                console.error("Error fetching TLDs:", error);
            }
        };

        fetchTlds();
    }, [tlds]);

    // Fetch premium domains based on the selected filter
    useEffect(() => {
        const fetchPremiumDomains = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/premium-domains`, {
                    params: { tld: filter === "All" ? "" : filter },
                });
                setDomains(response.data.data); // Set the fetched premium domains
            } catch (error) {
                console.error("Error fetching premium domains:", error);
            }
        };

        fetchPremiumDomains();
    }, [filter]); // Re-fetch when filter changes

    return (
        <div className="domain-section">
            <h2>🔥 After Market Premium Brandable Domains</h2>
            <p>Grab and Build your Business with a unique Domain Name before your competitors.</p>
            <p>Domain Prices are in US Dollars</p>
            <div className="filter-buttons">
                {/* "All" filter button */}
                <button
                    className={filter === "All" ? "active" : ""}
                    onClick={() => setFilter("All")}
                >
                    All
                </button>

                {/* Dynamically generated TLD filter buttons */}
                {tlds.map((tld) => (
                    <button
                        key={tld}
                        className={filter === tld ? "active" : ""}
                        onClick={() => setFilter(tld)}
                    >
                        {tld}
                    </button>
                ))}
            </div>

            <div className="domain-grid">
                {domains?.map((domain, index) => (
                    <div key={index} className="domain-card">
                        <div className="domain-header">
                            <h3>
                                {domain.name}
                                <span className="domain-ext">{domain.tld}</span>
                            </h3>
                            <span className="price">${domain.price.toLocaleString()}</span>
                        </div>
                        <div className="domain-info">
                            <p>
                                <FaBusinessTime />{domain.category}
                                {/* <FaCalendarAlt /> {new Date(domain.createdAt).toLocaleDateString() || 0} */}
                            </p>
                        </div>
                        <div className="domainsBtn_div">
                            <button className="buy-btn"><Link to={'https://www.escrow.com'} target="_blank">Buy Now</Link></button>
                            <button className="buy-btn"><Link to={'/contact'}>Make an Offer</Link></button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="view-all-btn">
                <Link to={"/domainList"}>Expand your search →</Link>
            </button>
        </div>
    );
};

export default TrendingDomains;
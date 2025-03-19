import React, { useState } from 'react';
import { FiSearch, FiArrowRight, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './DomainSearch.css';

const DomainSearch = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTerm = formData.get('search')?.trim() || '';
        const minPrice = formData.get('minPrice')?.trim() || '';
        const maxPrice = formData.get('maxPrice')?.trim() || '';
        
        if (!searchTerm && !minPrice && !maxPrice) {
            setError(true);
            return;
        }
        
        setError(false);
        const params = new URLSearchParams({
            search: searchTerm,
            minPrice,
            maxPrice
        });
        navigate(`/domainsearch?${params.toString()}`);
    };

    const clearError = () => {
        if (error) setError(false);
    };

    return (
        <div className="search-hero">
            <div className="search-content">
                <div className="search-header">
                    <h1 className="search-title">
                        Find Your Perfect <span>Domain</span>
                    </h1>
                    <p className="search-tagline">
                        Discover premium domains for your next venture. Search by name, 
                        category, or budget to launch your digital identity.
                    </p>
                </div>

                <div className="search-filter">
                    <form onSubmit={handleSearch}>
                        <div className="input-group">
                            <FiSearch className="input-icon" />
                            <input
                                type="text"
                                className="search-input"
                                name="search"
                                placeholder="Search domains (e.g. 'tech', 'startup', 'ai')"
                                onChange={clearError}
                            />
                        </div>

                        <div className="price-range">
                            <div className="input-group">
                                <FiDollarSign className="input-icon" />
                                <input
                                    type="number"
                                    className="price-input"
                                    name="minPrice"
                                    placeholder="Minimum"
                                    onChange={clearError}
                                />
                            </div>
                            <span className="price-separator">–</span>
                            <div className="input-group">
                                <FiDollarSign className="input-icon" />
                                <input
                                    type="number"
                                    className="price-input"
                                    name="maxPrice"
                                    placeholder="Maximum"
                                    onChange={clearError}
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="error-message">
                                Please provide at least one search criteria (name, min price, or max price)
                            </p>
                        )}

                        <button type="submit" className="search-btn">
                            Search Domains
                            <FiArrowRight className="btn-icon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DomainSearch;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './DomainSearch.css'; // Import the CSS file
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';

const DomainSearch = () => {
    const { domainName } = useParams();
    const [domain, setDomain] = useState(null);
    const [relatedDomains, setRelatedDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDomainSearch, setIsDomainSearch] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
                const isDomain = domainRegex.test(domainName);
                setIsDomainSearch(isDomain);

                let apiUrl;
                if (isDomain) {
                    apiUrl = `${process.env.REACT_APP_API_URL}/users/domain/${domainName}`;
                } else {
                    const decodedCategory = decodeURIComponent(domainName);
                    apiUrl = `${process.env.REACT_APP_API_URL}/users/category/${decodedCategory}`;
                }

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    if (isDomain) {
                        setDomain(response.data.data || null);
                        setRelatedDomains(response.data.relatedDomains || []);
                    } else {
                        setRelatedDomains(response.data.data || []);
                    }
                } else {
                    setError('No results found');
                }
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [domainName]);

    if (loading) return <div className='loader-div'>
        <div class="ui-loader loader-blk">
            <svg viewBox="22 22 44 44" class="multiColor-loader">
                <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
            </svg>
        </div>
    </div>;
    if (error) return <div className="error">{error}</div>;

    // const firstLetter = domainName.charAt(0).toUpperCase();

    return (
        <>
            <Header />
            <div className="domain-page">
                {/* Searched Domain Box */}
                {isDomainSearch ? (
                    <>
                        {domain ? (

                            <div className="searched-domain-box">
                                <div className='Exact-match'>
                                    Exact Match
                                </div>
                                <h1>{domain.name}<span className="tld">{domain.tld}</span></h1>
                                <div className="relatedDomain-description">
                                    <h3 className="description-title">Key Features</h3>
                                    <ul className="features-list">
                                        {domain.description.split('\n').map((point, index) => (
                                            point.trim() && (
                                                <li key={index} className="feature-item">
                                                    {/* <svg className="feature-icon" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg> */}
                                                    {point.trim()}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                                <div className="domain-details">
                                    <div className="detail-card">
                                        <h3>Price</h3>
                                        <p className="price">${domain.price}</p>
                                    </div>
                                    <div className="detail-card">
                                        <h3>Category</h3>
                                        <p className="category">{domain.category}</p>
                                    </div>

                                </div>
                            </div>

                        ) : (
                            <div className="domain-not-found">
                                <h2>Domain "{domainName}" not found</h2>
                            </div>
                        )}

                        {/* Related Domains Section */}
                        <div className="related-domains">
                            <h2>Related Domains</h2>
                            {/* <h2>Domains Starting with "{firstLetter}"</h2> */}
                            {relatedDomains.length > 0 ? (
                                <div className="domain-card-list">
                                    {relatedDomains.map((relatedDomain) => (
                                        <div key={relatedDomain._id} className="domain__card">
                                            <img
                                                src={relatedDomain.imageUrl || 'https://via.placeholder.com/150'} // Use a placeholder if no image is available
                                                alt={relatedDomain.name}
                                                className="domain-image"
                                            />
                                            <div className="domain-info">
                                                <h3 className="domain-name">
                                                    {relatedDomain.name}
                                                    <span className="tld">{relatedDomain.tld}</span>
                                                </h3>
                                                <p className="price">${relatedDomain.price}</p>
                                            </div>
                                            <div className="relatedDomain-description">
                                                <h3 className="description-title">Key Features</h3>
                                                <ul className="features-list">
                                                    {relatedDomain.description.split('\n').map((point, index) => (
                                                        point.trim() && (
                                                            <li key={index} className="feature-item">
                                                                {/* <svg className="feature-icon" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg> */}
                                                                {point.trim()}
                                                            </li>
                                                        )
                                                    ))}
                                                </ul>
                                            </div>
                                            {/* <p className="category">{relatedDomain.description}</p> */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-domains-message">No related domains found.</p>
                            )}
                        </div>
                    </>
                ) : (
                    /* Display category domains */
                    <div className="related-domains">
                        <h2>Domains in Category: {decodeURIComponent(domainName)}</h2>
                        {relatedDomains.length > 0 ? (
                            <div className="domain-card-list">
                                {relatedDomains.map((domain) => (
                                    // Fixed: Removed extra div
                                    <div key={domain._id} className="domain__card">
                                        <img
                                            src={domain.imageUrl || 'https://via.placeholder.com/150'}
                                            alt={domain.name}
                                            className="domain-image"
                                        />
                                        <div className="domain-info">
                                            <h3 className="domain-name">
                                                {domain.name}
                                                <span className="tld">{domain.tld}</span>
                                            </h3>
                                            <p className="price">${domain.price}</p>
                                            {/* <p className="category">{domain.category}</p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-domains-message">No domains found in this category.</p>
                        )}
                    </div>
                )}
                {/* Call-to-Action Section */}
                <div className="cta-section">
                    <button className="buy-button"><Link to={'/contact'}>Contact Us</Link></button>
                    <p className="secure-badge">🔒 Secure Transaction | SSL Encrypted</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DomainSearch;
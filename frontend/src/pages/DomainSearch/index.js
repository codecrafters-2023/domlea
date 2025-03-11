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

    useEffect(() => {
        const fetchDomain = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/domain/${domainName}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setDomain(response.data.data);
                    setRelatedDomains(response.data.relatedDomains || []); // Set related domains
                } else {
                    setError('Domain not found');
                }
            } catch (error) {
                setError('Error fetching domain');
            } finally {
                setLoading(false);
            }
        };

        fetchDomain();
    }, [domainName]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <Header />
            <div className="domain-page">
                {/* Searched Domain Box */}
                <div className="searched-domain-box">
                    <h1>{domain.name}<span className="tld">{domain.tld}</span></h1>
                    <p className="domain-description">{domain.description}</p>
                    <div className="domain-details">
                        <div className="detail-card">
                            <h3>Price</h3>
                            <p className="price">${domain.price}</p>
                        </div>
                        <div className="detail-card">
                            <h3>Category</h3>
                            <p className="category">{domain.category}</p>
                        </div>
                        <div className="detail-card">
                            <h3>Added Date</h3>
                            <p className="expiry-date">
                                {new Date(domain.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Domains Section */}
                {relatedDomains.length > 0 && (
                    <div className="related-domains">
                        <h2>Related Domains</h2>
                        <div className="related-domains-list">
                            {relatedDomains.map((relatedDomain) => (
                                <div key={relatedDomain._id} className="related-domain-item">
                                    <Link to={`/domainSearch/${relatedDomain.name}${relatedDomain.tld}`}>
                                        <span className="domain-name">{relatedDomain.name}</span>
                                        <span className="tld">{relatedDomain.tld}</span>
                                    </Link>
                                    <p className="price">${relatedDomain.price}</p>
                                </div>
                            ))}
                        </div>
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
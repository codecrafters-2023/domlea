import React, { useEffect, useState } from 'react';
import './PremiumDomains.css';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumDomains = () => {
    const [domain, setDomain] = useState(null);
    const [loading, setLoading] = useState(true);
    const { ref, inView } = useInView({ threshold: 0.1 });

    useEffect(() => {
        const fetchPremiumDomain = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/premium-domains`);
                // Check if there's at least one premium domain
                if (response.data.data.length > 0) {
                    setDomain(response.data.data[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching premium domain:', error);
                setLoading(false);
            }
        };
        fetchPremiumDomain();
    }, [domain]);

    // Don't render anything if there's no premium domain
    if (!loading && !domain) return null;

    return (
        <div className="domain-container" ref={ref}>
            <AnimatePresence>
                <h1 className='premium-domain-heading'>Domain of the Week</h1>
                {loading ? (
                    <motion.div
                        className="advanced-loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="holographic-loader"></div>
                    </motion.div>
                ) : (
                    domain && (
                        <motion.div
                            className="domain-layout"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="domain-hero">
                                <div className="domain-header">
                                    <span className="domain-status">Featured Premium</span>
                                    <motion.h1
                                        className="domain_name"
                                        animate={inView ? { x: 0 } : { x: -50 }}
                                    >
                                        {domain.name}
                                        <span className="domain-tld">{domain.tld}</span>
                                    </motion.h1>
                                </div>

                                <motion.div
                                    className="price-bubble"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="price-content">
                                        <img
                                            src={`https://flagcdn.com/16x12/${domain.countryCode}.png`}
                                            alt={domain.currency}
                                            style={{ width: '20px', height: '16px', marginRight: "5px" }}
                                        />
                                        <span className="amount">{domain.price.toLocaleString()}</span>
                                        <span className="currency">{domain.currency}</span>
                                    </div>
                                    <div className="price-aura"></div>
                                </motion.div>
                            </div>

                            <div className="domain-body">
                                <motion.div
                                    className="cta-container"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="security-assurance">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                        </svg>
                                        Verified & Secured Transaction
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </div>
    );
};

export default PremiumDomains;
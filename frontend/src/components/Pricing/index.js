// Pricing.jsx
import React, { useState } from 'react';
import './Pricing.css';

const Pricing = () => {
    const [annualPricing, setAnnualPricing] = useState(true);

    const plans = [
        {
            tld: '.com',
            price: 12.99,
            promoPrice: 9.99,
            features: ['Most Popular TLD', 'Free WHOIS Privacy', 'Free DNS Management', '1 Email Account'],
            popular: true
        },
        {
            tld: '.net',
            price: 14.99,
            promoPrice: 11.99,
            features: ['Professional Recognition', 'Free SSL Certificate', 'Domain Locking', '24/7 Support']
        },
        {
            tld: '.io',
            price: 49.99,
            promoPrice: 39.99,
            features: ['Tech Startup Favorite', 'Free Domain Forwarding', 'Status Page', 'Premium Support'],
            bestValue: true
        }
    ];

    return (
        <section className="pricing-section">
            <div className="pricing-container">
                <div className="section-header">
                    <h2>Transparent Domain Pricing</h2>
                    <p className="subtitle">Get started with our competitive rates</p>

                    <div className="pricing-toggle">
                        <span className={annualPricing ? 'active' : ''}>Annual</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={!annualPricing}
                                onChange={() => setAnnualPricing(!annualPricing)}
                            />
                            <span className="slider"></span>
                        </label>
                        <span className={!annualPricing ? 'active' : ''}>Multi-year</span>
                    </div>
                </div>

                <div className="promo-banner">
                    🎉 First year 30% OFF on all new registrations!
                </div>

                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <div className={`pricing-card ${plan.popular ? 'popular' : ''} ${plan.bestValue ? 'best-value' : ''}`} key={index}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            {plan.bestValue && <div className="best-value-badge">Best Value</div>}

                            <h3 className="tld">{plan.tld}</h3>

                            <div className="price">
                                <span className="original-price">${plan.price}</span>
                                <span className="promo-price">${plan.promoPrice}</span>
                                <span className="period">/year</span>
                            </div>

                            <ul className="features">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex}><span>✓</span> {feature}</li>
                                ))}
                            </ul>

                            <button className="cta-button">
                                Register Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="price-guarantee">
                    <div className="guarantee-card">
                        <h3>Price Match Guarantee</h3>
                        <p>Found a better price? We'll match it!</p>
                    </div>
                    <div className="guarantee-card">
                        <h3>30-Day Money Back</h3>
                        <p>Not satisfied? Get full refund within 30 days</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
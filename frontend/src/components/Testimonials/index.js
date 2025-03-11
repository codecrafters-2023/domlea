// Testimonials.jsx
import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Startup Founder',
            text: 'The easiest domain purchasing experience I\'ve ever had. Transferred all my domains here within a week!',
            avatar: `${process.env.PUBLIC_URL + '/team-2.jpg'}`,
            rating: 5
        },
        {
            id: 2,
            name: 'Mario Ortega',
            role: 'Tech Lead',
            text: 'Outstanding customer support helped me secure the perfect domain for our new product launch.',
            avatar: `${process.env.PUBLIC_URL + '/client-img8.png'}`,
            rating: 4.5
        },
        {
            id: 3,
            name: 'Stephanie Garza',
            role: 'Digital Agency Owner',
            text: 'Competitive pricing and instant setup made switching providers a no-brainer. Highly recommended!',
            avatar: `${process.env.PUBLIC_URL + '/client-img9.png'}`,
            rating: 5
        }
    ];

    const companies = [
        'company-logo1.svg',
        'company-logo2.svg',
        'company-logo3.svg',
        'company-logo4.svg',
        'company-logo5.svg'
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="section-header">
                    <h2>Trusted by Thousands of Businesses</h2>
                    <p className="subtitle">Join our community of satisfied customers</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div className="testimonial-card" key={testimonial.id}>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`star ${i < testimonial.rating ? 'filled' : ''}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="author-info">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="avatar"
                                />
                                <div className="author-details">
                                    <h4 className="author-name">{testimonial.name}</h4>
                                    <p className="author-role">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="social-proof">
                    <p className="trusted-by">Trusted by industry leaders:</p>
                    <div className="company-logos">
                        {companies.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt="Company logo"
                                className="company-logo"
                            />
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default Testimonials;
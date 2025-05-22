import React from 'react'
import './banner.css'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div>
            <div className="business-banner">
                <div className="banner-content">
                    <div className="left-section">
                        <img
                            src="/Sam_LI-2white.webp"
                            alt="Realro Logo"
                            className="company_logo"
                        />
                    </div>
                    <div className="contact-info">
                        <h1 className="name">Sam Farmaha</h1>
                        <h2 className="company">Realro®</h2>

                        <div className="address-block">
                            <p>55 Ontario Street S.</p>
                            <p>Milton, Ontario.</p>
                            <p>L9T 2M5</p>
                        </div>

                        <div className="phone-block">
                            <span className="phone-label">Direct Phone:</span>
                            <span className="phone-number">+1 (416) 951-2158</span>
                        </div>
                        <h2 className="banner_tagline">MAKE CANADA YOUR HOME</h2>
                    </div>

                    <div className="right-section">
                        <div className="tagline-wrapper">
                            <Link to={'https://listings.iprorealty.com' } target="_blank">
                                <img
                                    src="/IPRO-1024x391.jpg"
                                    alt="Canada Flag"
                                    className="flag-image"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner

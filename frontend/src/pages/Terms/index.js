// Disclaimer.js
import React from 'react';
import './Terms.css';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';

const Terms = () => {
    return (
        <>
            <Header />
            <section className="disclaimer-section">
                <h2 className="disclaimer-heading">Terms & Conditions</h2>
                <div className="disclaimer-content">
                    <p>
                        The information provided by this website is for after-market Domain sales.
                        Visitors can buy a domain by using the{' '}
                        <a href="https://www.escrow.com"
                            className="disclaimer-link"
                            target="_blank"
                            rel="noopener noreferrer">
                            www.Escrow.com
                        </a>{' '}
                        service for Domain name transactions. Buyers and sellers of Domain names
                        are responsible for their transactions.
                    </p>

                    <p>
                        <a href="https://www.escrow.com"
                            className="disclaimer-link"
                            target="_blank"
                            rel="noopener noreferrer">
                            www.escrow.com
                        </a>{' '}
                        verifies the domain's rightful ownership before transferring the funds
                        to the seller and charges a fee for its services.{' '}
                        <a href="https://www.domlea.com"
                            className="disclaimer-link"
                            target="_blank"
                            rel="noopener noreferrer">
                            Domlea.com
                        </a>{' '}
                        only helps connect buyers and sellers, and is not a part of the transactions
                        or provides any guarantee.
                    </p>

                    {/* Add remaining paragraphs following the same pattern */}

                    <p>
                        All information on the Site is provided in good faith, and we make no
                        representation or warranty of any kind, express or implied, regarding
                        the accuracy, adequacy, validity, reliability, availability, or
                        completeness of any information on the Site.
                    </p>
                    <p>
                        The Site may contain information related to various fields, including, but not limited to, health, finance, and law. This information is not a substitute for professional advice.
                    </p>
                    <p>
                        Always seek the advice of your qualified professional with any questions you may have regarding a particular subject. This website may contain links to external websites that we do not provide or maintain. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external sites. In no event shall we be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Site. Your use of the Site is at your own risk. We reserve the right to update our disclaimer from time to time. You are advised to review this disclaimer periodically for any changes.
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Terms;
// Disclaimer.js
import React from 'react';
import './Terms.css';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';

const Terms = () => {
    return (
        <>
            <Header />
            {/* <section className="disclaimer-section">
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

                    {/* Add remaining paragraphs following the same pattern 

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
            </section> */}

            <section className="terms-section">
                <h2 className="terms-heading">Terms & Conditions</h2>
                <div className="terms-content">
                    <h3>Welcome to Domlea.com</h3>
                    <p>Domlea is a platform that connects buyers and sellers of aftermarket domain names. By using our website or services, you agree to these Terms and Conditions. We may update this Agreement at any time by posting the new version on our site.</p>

                    <h3>1. Eligibility and Agreement</h3>
                    <p>By using Domlea:</p>
                    <ul className="terms-list">
                        <li>You confirm that you are at least 18 years old.</li>
                        <li>You agree to follow these terms whether you are buying or selling a domain name.</li>
                        <li>You confirm you have the legal authority to act on your own behalf or for the business or person you represent.</li>
                        <li>You agree not to misuse our platform or misrepresent yourself in any way.</li>
                    </ul>
                    <p>This agreement is legally binding under the ESIGN Act (Electronic Signatures in Global and National Commerce Act).</p>

                    <p>If you do not agree to these terms, please do not use our services.</p>

                    <h3>2. Seller Responsibilities</h3>
                    <p>If you're listing a domain for sale, you agree to the following:</p>
                    <ul className="terms-list">
                        <li>You own or have the exclusive legal right to sell the Domain name.</li>
                        <li>Your Domain name is registered with a legitimate registrar and is not about to be canceled or deactivated.</li>
                        <li>The domain name is not currently involved in legal disputes or ownership challenges.</li>
                        <li>The Domain name does not infringe on any third-party rights, including trademarks, names, or publicity rights.</li>
                        <li>You will provide accurate information about the Domain name.</li>
                        <li>Once a buyer accepts the purchase price of your Domain name, you will complete the sale with honesty and good ethics for a smooth transaction.</li>
                        <li>You agree not to list or transfer domains that are illegal to sell or that you don’t own.</li>
                        <li>After payment is received, you will transfer all ownership and intellectual property rights in the domain to the buyer.</li>
                        <li>You agree to act in good faith and comply with applicable tax reporting and payments.</li>
                    </ul>

                    <h3>3. Buyer Responsibilities</h3>
                    <p>If you're buying a domain:</p>
                    <ul className="terms-list">
                        <li>Do your own research before making a purchase. Domlea does not offer investment advice.</li>
                        <li>After your payment is verified, the domain will be transferred to your name at the current registrar.</li>
                        <li>You may keep it there or move it to a different registrar if allowed.</li>
                        <li>It is your sole responsibility to keep the domain registration active and in good standing.</li>
                        <li>Registrars charge annual fees (usually $10–$20/year). You must pay these renewal fees directly to your registrar.
                        </li>
                        <li>If you fail to renew your Domain name on time, you will lose ownership of the Domain name.
                        </li>
                    </ul>

                    <h3>4. Legal Disclaimer</h3>
                    <ul>
                        <li>Third-Party Rights</li>
                        <ul className="terms-list">
                            <li>Domlea does not guarantee that domain names listed on the platform do not infringe on third-party rights (such as trademarks).</li>
                            <li>Buyers are solely responsible for ensuring that a domain name does not violate any applicable laws or the rights of others.</li>
                        </ul>
                        <li>Purpose of the Website</li>
                        <ul className="terms-list">
                            <li>This website is intended for after-market domain sales platform.</li>
                            <li>Buyers can purchase domain names via <a href='https://escrow.com' className='terms-link'>www.Escrow.com</a>, a third-party service that facilitates secure transactions.</li>
                        </ul>
                        <li>Escrow.com Services</li>
                        <ul className="terms-list">
                            <li>Escrow.com verifies domain ownership before releasing funds to the seller.</li>
                            <li>A service fee is charged by Escrow.com for handling the transaction.</li>
                        </ul>
                        <li>Domlea’s Role and Fees</li>
                        <ul className="terms-list">
                            <li>Domlea charges a brokerage fee from the seller of the domain name sales.</li>
                            <li>Buyers do not pay any fee to Domlea unless otherwise agreed upon with the seller.</li>
                            <li>Domlea acts only as a facilitator connecting buyers and sellers.</li>
                            <li>Domlea does not guarantee Domain name transfer, and is not a party to any transaction, transactions are conducted between buyers and sellers by Escrow service.</li>
                        </ul>
                        

                        <li>Information on the Site</li>
                        <ul className='terms-list'>
                            <li>All content is provided in good faith without warranties of any kind.</li>
                            <li>Domlea makes no representation or warranty, express or implied, about the accuracy, adequacy, reliability, or completeness of any content.</li>
                        </ul>
                        <li>Content & Professional Advice</li>
                        <ul className='terms-list'>
                            <li>The site may include general information on topics such as health, finance, and law</li>
                            <li>This content is not a substitute for professional advice.</li>
                            <li>Always consult a qualified professional for guidance on specific matters</li>
                        </ul>
                        <li>External Links</li>
                        <ul className='terms-list'>
                            <li>The site may contain links to external websites not maintained or operated by Domlea.</li>
                            <li>Domlea does not guarantee the accuracy, relevance, or completeness of information on these third-party sites.</li>
                        </ul>
                        <li>Limitation of Liability</li>
                        <ul className='terms-list'>
                            <li>Domlea shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of this site.</li>
                            <li>Use of the site is at your own risk.</li>
                        </ul>
                        <li>Updates to Disclaimer</li>
                        <ul className='terms-list'>
                            <li>Domlea reserves the right to modify this disclaimer at any time without notice.</li>
                            <li>Users are encouraged to review the disclaimer periodically for changes.</li>
                        </ul>
                    </ul>
                </div>
            </section>




            <Footer />
        </>
    );
};

export default Terms;
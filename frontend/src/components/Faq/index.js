import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        { question: "What is a domain name?", answer: "A domain name is the address of your website that people type in the browser's URL bar to visit your site. For example, 'example.com' is a domain name." },

        { question: "How much does a domain name cost?", answer: "The cost of a domain name varies depending on the domain extension (TLD) and the registrar. Prices typically range from $10 to $50 per year." },

        { question: "Can I transfer my domain to another registrar?", answer: "Yes, you can transfer your domain to another registrar. The process usually involves unlocking your domain, obtaining an authorization code, and initiating the transfer with the new registrar." },

        { question: "What is domain privacy protection?", answer: "Domain privacy protection is a service that hides your personal contact information from the public WHOIS database, protecting you from spam and identity theft." },

        { question: "How long does it take to register a domain?", answer: "Domain registration is usually instant. Once you complete the purchase, your domain will be registered and available for use immediately." },
    ];

    return (
        <div className="faq-section">
            <div className="overlay"></div>
            <div className="faq-container">
                <h2 className="faq-title">Frequently Asked Question</h2>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </p>
                <div className="faq-content">
                    <img src={process.env.PUBLIC_URL + '/faq-img2.png'} alt="Side Illustration" className="faq-side-image" />
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
                                <div className="faq-question" onClick={() => toggleAccordion(index)}>
                                    {faq.question}
                                    <span className="faq-toggle">{openIndex === index ? "-" : "+"}</span>
                                </div>
                                {openIndex === index && 
                                <div
                                    className="faq-answer"
                                    style={{
                                        maxHeight: openIndex === index ? "200px" : "0px",
                                        opacity: openIndex === index ? "1" : "0",
                                        transition: "max-height 0.5s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out"
                                    }}
                                >
                                    {faq.answer}
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <img src={process.env.PUBLIC_URL + '/faq-bg.jpg'} alt="Side Illustration" className="faq-bg" /> */}
        </div>
    );
};

export default FAQ;
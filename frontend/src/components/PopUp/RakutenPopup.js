// components/RakutenPopup.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import './RakutenPopup.css';

const RakutenPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasClosed, setHasClosed] = useState(false);

    useEffect(() => {
        // Check if user has closed the popup in this session
        const popupClosed = sessionStorage.getItem('rakutenPopupClosed');

        // Show popup after a short delay when component mounts
        if (!popupClosed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000); // Show after 1 second

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setHasClosed(true);
        // Store in sessionStorage that user closed popup for this session
        sessionStorage.setItem('rakutenPopupClosed', 'true');
    };

    const handleOpenLink = () => {
        window.open('https://www.rakuten.ca/r/deal', '_blank');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="rakuten-popup-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="rakuten-popup-content"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    >
                        <button className="popup-close-btn" onClick={handleClose}>
                            <X size={20} />
                        </button>

                        <div className="popup-header">
                            <img
                                src="https://www.rakuten.com/favicon.ico"
                                alt="Rakuten Logo"
                                className="popup-logo"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                }}
                            />
                            <h2>🇨🇦 Rakuten Canada</h2>
                        </div>

                        <div className="popup-body">
                            <p className="popup-message">
                                <strong>Canadian consumers:</strong><br />
                                Earn money and get cash-back on every purchase. Act now. 💰
                            </p>

                            <div className="popup-referral">
                                <p className="referral-text">
                                    <span className="heart">❤️</span> Refer your soulmate and classmate
                                </p>
                            </div>

                            <div className="popup-actions">
                                <button onClick={handleOpenLink} className="popup-button primary">
                                    Get Cash Back Now
                                    <ExternalLink size={16} />
                                </button>

                                <a
                                    href="https://www.rakuten.ca/r/deal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="popup-link"
                                >
                                    www.rakuten.ca/r/deal
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RakutenPopup;
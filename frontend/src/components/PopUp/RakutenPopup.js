// components/RakutenPopup.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Gift, Users, ChevronRight } from 'lucide-react';
import './RakutenPopup.css';

const RakutenPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Check if user has closed the popup in this session
    const popupClosed = sessionStorage.getItem('rakutenPopupClosed');
    
    // Show popup after a short delay when component mounts
    if (!popupClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Show after 1.5 seconds

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
          className="modern-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modern-popup-content"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button className="modern-popup-close" onClick={handleClose}>
              <X size={20} />
            </button>

            {/* Banner Image */}
            {!imageError ? (
              <div className="popup-banner">
                <img 
                  src="https://chatgpt.com/backend-api/estuary/public_content/enc/eyJpZCI6Im1fNjliMjBkZDU5Mjg4ODE5MWJlZTY2OGMzOGI1ZTY2NDY6ZmlsZV8wMDAwMDAwMDEzYjQ3MWZkYjRlNTFjY2QyZjkyMTI1MCIsInRzIjoiMjA1MjUiLCJwIjoicHlpIiwiY2lkIjoiMSIsInNpZyI6IjIwNDVjNDVlMGY3NTVlMTdhMTBmZWJhYmQ4ODFmY2ZlMDQyZThmOTBiNjAyYjhiNzc2NDhkZGMxOWRjYTM0ZWEiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsLCJjcyI6bnVsbCwiY2RuIjpudWxsLCJjcCI6bnVsbCwibWEiOm51bGx9" 
                  alt="Rakuten Canada Special Offer"
                  className="banner-image"
                  onError={() => setImageError(true)}
                />
                <div className="banner-overlay">
                  <span className="banner-tag">🇨🇦 EXCLUSIVE OFFER</span>
                </div>
              </div>
            ) : (
              <div className="popup-banner-fallback">
                <Gift size={48} className="fallback-icon" />
                <span>Special Offer</span>
              </div>
            )}

            {/* Content */}
            <div className="popup-content-wrapper">
              {/* Logo and Title */}
              <div className="popup-header">
                <img 
                  src="https://www.rakuten.com/favicon.ico" 
                  alt="Rakuten Logo" 
                  className="popup-logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/api/placeholder/40/40';
                  }}
                />
                <div className="header-text">
                  <h2>Rakuten Canada</h2>
                  <p className="header-subtitle">Cash Back & Rewards</p>
                </div>
              </div>

              {/* Main Message */}
              <div className="popup-message">
                <h3 className="message-title">
                  Canadian consumers: <span className="highlight">Earn money</span> on every purchase
                </h3>
                <p className="message-text">
                  Get cash-back on every purchase. Act now and start saving! 💰
                </p>
              </div>

              {/* Referral Section */}
              <div className="referral-section">
                <div className="referral-badge">
                  <Users size={20} className="referral-icon" />
                  <span>Refer your soulmate and classmate</span>
                </div>
              </div>

              {/* CTA Button */}
              <button onClick={handleOpenLink} className="cta-button">
                <span>Get Cash Back Now</span>
                <ChevronRight size={20} />
              </button>

              {/* Link */}
              <div className="popup-footer">
                <a 
                  href="https://www.rakuten.ca/r/deal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="popup-link"
                >
                  www.rakuten.ca/r/deal
                  <ExternalLink size={14} />
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
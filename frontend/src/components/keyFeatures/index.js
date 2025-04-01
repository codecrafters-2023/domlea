import React from "react";
import "./KeyFeatures.css";
import { FaHandshake, FaMoneyBillWave, FaTruck, FaClipboardCheck, FaUnlock } from "react-icons/fa";

const KeyFeatures = () => {
    return (
        <section className="escrow-section">
            {/* <h2>Over <span>$7.5 billion</span> of transactions protected with Escrow.com</h2> */}
            <h2>We  use Escrow.com to securely transfer the Domain to the buyer.</h2>
            {/* <p>
                We  use Escrow.com to securely transfer the Domain to the buyer.
            </p> */}
            <div className="steps">
                <div className="step">
                    <FaHandshake className="icon" />
                    <p>1. Buyer and Seller agree to terms</p>
                </div>
                <div className="step">
                    <FaMoneyBillWave className="icon" />
                    <p>2. Buyer submits payment to Escrow</p>
                </div>
                <div className="step">
                    <FaTruck className="icon" />
                    <p>3. Seller delivers domains to Escrow.com</p>
                </div>
                <div className="step">
                    <FaClipboardCheck className="icon" />
                    <p>4. Buyer approve domains.</p>
                </div>
                <div className="step">
                    <FaUnlock className="icon" />
                    <p>5. Escrow.com releases payment to seller</p>
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;

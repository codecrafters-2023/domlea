import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';

export default function Hero() {
    const [domainName, setDomainName] = useState('');
    const [error, setError] = useState('');
    // const [relatedDomains, setRelatedDomains] = useState([]); // State to store related domains
    const navigate = useNavigate();

    const handleSearch = async () => {
        const trimmedInput = domainName.trim().replace(/\.+$/, ''); // Remove trailing dots

        if (!trimmedInput) {
            setError('Please enter a valid domain name or category');
            return;
        }

        // Add this before the domainRegex check
        if (/\s/.test(trimmedInput)) {
            setError('Domain names cannot contain spaces');
            return;
        }

        // Regular expression to validate domain format (example.com)
        const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

        if (domainRegex.test(trimmedInput)) {
            // Valid domain format - navigate to domain search
            navigate(`/domainSearch/${trimmedInput}`);
        } else {
            // Treat as category search - encode special characters
            const encodedCategory = encodeURIComponent(trimmedInput);
            navigate(`/domainSearch/${encodedCategory}`);
        }
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">Build Your Online Business</h1>
                <p className='hero-sub-title'>Explore Our Premium collection of after Market Domains</p>

                <div className="search-container">
                    <div className="search-form">
                        <input
                            type="text"
                            placeholder="Enter Category or Domain Name"
                            value={domainName}
                            onChange={(e) => setDomainName(e.target.value)}
                            className="search-input"
                        />
                        <button onClick={handleSearch} className="search-button">
                            Search
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* {relatedDomains.length > 0 && (
                    <div className="related-domains">
                        <h3>Related Domains:</h3>
                        <ul>
                            {relatedDomains.map((domain, index) => (
                                <li key={index}>{domain.name}.{domain.tld}</li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>

            <div className="hero-image">
                <img
                    src={process.env.PUBLIC_URL + '/home-img.png'}
                    alt="Domain search"
                />
            </div>
            <div className="hero-image-bg">
                <img
                    src={process.env.PUBLIC_URL + '/home-two-bg.png'}
                    alt="background"
                />
            </div>
        </div>
    );
}
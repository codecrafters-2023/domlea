import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './hero.css';

export default function Hero() {
    const [companyName, setCompanyName] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('com');
    const [error, setError] = useState('');
    const [tlds, setTlds] = useState([]); // State to store TLDs
    const navigate = useNavigate();

    // Fetch all TLDs from the backend when the component mounts
    useEffect(() => {
        const fetchTlds = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all-tlds`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTlds(response.data.data); // Set the fetched TLDs
            } catch (error) {
                console.error("Error fetching TLDs:", error);
            }
        };

        fetchTlds();
    }, []);

    const handleSearch = async () => {
        // Trim any leading or trailing spaces and dots from the company name
        const trimmedCompanyName = companyName.trim().replace(/\.+$/, ''); // Remove trailing dots
        const trimmedSelectedDomain = selectedDomain.replace(/^\.+/, ''); // Remove leading dots

        // Validate input
        if (!trimmedCompanyName || !trimmedSelectedDomain) {
            setError('Please enter a valid domain name and select a TLD.');
            return;
        }

        // Construct the domain name with only one dot
        const domainToSearch = `${trimmedCompanyName}.${trimmedSelectedDomain}`;

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/check-domain`, {
                params: { domain: domainToSearch },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.exists) {
                navigate(`/domainSearch/${domainToSearch}`);
            } else {
                setError('No domain found');
            }
        } catch (error) {
            console.error("Error checking domain:", error);
            setError('Error checking domain');
        }
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">Looking For Unique Domain Name?</h1>

                <div className="domain-list">
                    {tlds.map((tld, index) => (
                        <div
                            key={tld}
                            className="domain-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {tld} <span>${/* Add price here if available */}</span>
                        </div>
                    ))}
                </div>

                <div className="search-container">
                    <div className="search-form">
                        <input
                            type="text"
                            placeholder="Enter Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="search-input"
                        />
                        <select
                            value={selectedDomain}
                            onChange={(e) => setSelectedDomain(e.target.value)}
                            className="search-select"
                        >
                            {tlds.map((tld) => (
                                <option key={tld} value={tld}>
                                    {tld}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleSearch} className="search-button">
                            Search
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>
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
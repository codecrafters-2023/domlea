import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';

export default function Hero() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTerm = formData.get('search')?.trim() || '';

        if (!searchTerm) {
            setError(true);
            return;
        }

        setError(false);
        const params = new URLSearchParams({
            search: searchTerm,
        });
        navigate(`/domainsearch?${params.toString()}`);
    };

    const clearError = () => {
        if (error) setError(false);
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">Build Your Online Business</h1>
                <p className='hero-sub-title'>Explore Our Premium collection of after Market Domains</p>

                <div className="search-container">
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            name='search'
                            placeholder="Enter Keyword to Start your Search"
                            // value={domainName}
                            onChange={clearError}
                            className="search-input"
                            autoComplete='off'
                        />
                        <button type='submit' className="search-button">
                            Search
                        </button>
                    </form>
                    {error && <p className="error-message">{"Please fill the Input box."}</p>}
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
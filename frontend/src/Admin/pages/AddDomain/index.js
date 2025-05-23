import React, { useState } from 'react';
import axios from 'axios';
import './DomainForm.css';
import AdminSidebar from '../../components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddDomainPage = () => {

    const defaultDescription = `Unlock the Power of a Premium Keyword Domain for Your Business

We’re offering you an exclusive opportunity to acquire a high-impact keyword domain that perfectly aligns with your business. This isn’t just a web address—it’s a strategic asset that can elevate your brand and accelerate growth.

✅ Perfect Business Alignment
This domain directly reflects your niche, making it a seamless fit with your brand. There’s no need to replace your main website—you can forward this domain to your existing site or use it to create a targeted lead-generation platform.

✅ SEO Advantage
Own your niche in search rankings. A keyword-rich domain naturally improves your visibility on search engines, driving more organic traffic and putting you ahead of the competition.

✅ Stronger Branding
Short, memorable, and highly relevant—this domain sticks with your audience and clearly communicates what your business is all about.

✅ Built-In Trust & Authority
Keyword domains convey expertise and credibility, helping you gain trust with potential customer’s right from the first click.

✅ Marketing Power
Imagine the campaigns you could build around this domain. It adds impact to every ad, social post, or email campaign, enhancing your overall marketing strategy.

✅ Long-Term Investment
High-quality domain names appreciate in value. Beyond its immediate benefits, this is a smart investment in your brand’s future.

This domain name offers immense potential to drive traffic, generate leads, and position your business as a leader in your space. If you’re interested in discussing pricing, transfer options, or how to make the most of this opportunity, we will be happy to connect.

Don’t miss this chance to boost your online presence and stand out in your industry.`;


    const [formData, setFormData] = useState({
        name: '',
        tld: '.com',
        price: '',
        currency: 'USD',
        currencySymbol: '$',
        countryCode: 'us',
        category: '',
        description: defaultDescription,
        websiteUrl: '',
        isPremium: false,
    });

    const currencyOptions = [
        { value: 'USD', label: 'USD', symbol: '$', countryCode: 'us' },
        { value: 'AUD', label: 'AUD', symbol: '$', countryCode: 'au' },
        { value: 'EURO', label: 'EURO', symbol: '€', countryCode: 'eu' },
        { value: 'GBP', label: 'GBP', symbol: '£', countryCode: 'gb' },
        { value: 'CAD', label: 'CAD', symbol: '$', countryCode: 'ca' }
    ];

    const customStyles = {
        option: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
        }),
    };

    const formatOptionLabel = ({ label, symbol, countryCode }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
                src={`https://flagcdn.com/16x12/${countryCode}.png`}
                alt={label}
                style={{ width: '16px', height: '12px' }}
            />
            <span>{label} ({symbol})</span>
        </div>
    );

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/domains/addDomain`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                toast.success('Domain added successfully');
                navigate('/domains');
            }
        } catch (error) {
            console.error('Error adding domain:', error);
        }
    };

    // const currencyOptions = [
    //     { value: 'USD', label: 'USD', symbol: '$', flag: 'https://upload.wikimedia.org/wikipedia/en/archive/a/a4/20250221172327%21Flag_of_the_United_States.svg' },
    //     { value: 'AUD', label: 'AUD', symbol: '$', flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg' },
    //     { value: 'EURO', label: 'EURO', symbol: '€', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/255px-Flag_of_Europe.svg.png' },
    //     { value: 'GBP', label: 'GBP', symbol: '£', flag: 'https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg' },
    //     { value: 'CAD', label: 'CAD', symbol: '$', flag: 'https://upload.wikimedia.org/wikipedia/en/archive/c/cf/20190402205956%21Flag_of_Canada.svg' }
    // ];



    return (
        <>
            <AdminSidebar />
            <div className="form-container">
                <div className="form-content">
                    <h2 className="form-title">Add New Domain</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Domain Name:</label>
                            <div className="domain-input">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <select
                                    value={formData.tld}
                                    onChange={(e) => setFormData({ ...formData, tld: e.target.value })}
                                >
                                    <option value=".com">.com</option>
                                    <option value=".in">.in</option>
                                    <option value=".us">.us</option>
                                    <option value=".net">.net</option>
                                    <option value=".org">.org</option>
                                    <option value=".io">.io</option>
                                    <option value=".ca">.ca</option>
                                    <option value=".qa">.qa</option>
                                    <option value=".ae">.ae</option>
                                    <option value=".asia">.asia</option>
                                    <option value=".club">.club</option>
                                    <option value=".shop">.shop</option>
                                    <option value=".academy">.academy</option>
                                    <option value=".xyz">.xyz</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Currency:</label>
                            <Select
                                options={currencyOptions}
                                value={currencyOptions.find(option => option.value === formData.currency)}
                                onChange={(selectedOption) =>
                                    setFormData({
                                        ...formData,
                                        currency: selectedOption.value,
                                        currencySymbol: selectedOption.symbol,
                                        countryCode: selectedOption.countryCode
                                    })
                                }
                                formatOptionLabel={formatOptionLabel}
                                styles={customStyles}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                                type="date"
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category:</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                            {/* <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="Technology">Technology</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Entertainment">Entertainment</option>
                            </select> */}
                        </div>

                        <div className="form-group">
                            <label>Website URL:</label>
                            <input
                                type="url"
                                value={formData.websiteUrl}
                                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                placeholder="https://example.com"
                                pattern="https?://.+"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                value={formData.description}
                                placeholder="Enter each feature on a new line..."
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="form-group" style={{display:"flex", alignItems:"center", gap:"10px"}}>
                            <label style={{margin:"0"}}>
                                <input
                                    type="checkbox"
                                    checked={formData.isPremium}
                                    onChange={(e) =>
                                        setFormData({ ...formData, isPremium: e.target.checked })
                                    }
                                    />
                            </label>
                                    Premium Domain
                        </div>

                        <button type="submit" className="btn-primary">Add Domain</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddDomainPage;

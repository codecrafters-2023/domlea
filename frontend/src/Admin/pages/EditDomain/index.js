import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../components/Navbar';
import './EditDomain.css';
import { toast } from 'react-toastify';

const EditDomain = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [domain, setDomain] = useState({
        name: '',
        tld: '',
        price: '',
        currency: 'USD', // Add this line
        category: '',
        expiryDate: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDomain = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/domains/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setDomain({
                    ...res.data.data,
                    // name: res.data.name.replace(res.data.tld, '') // Remove TLD from name
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load domain');
                setLoading(false);
            }
        };
        fetchDomain();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/domains/${id}`, {
                ...domain,
                // name: domain.name.toLowerCase() + domain.tld
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/domains');
            toast.success('Successfully updated domain')
        } catch (err) {
            setError('Failed to update domain');
        }
    };

    const handleChange = (e) => {
        setDomain({ ...domain, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="edit-domain-page">
            <AdminSidebar />
            <div className="edit-domain-container">
                <h1>Edit Domain</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Domain Name</label>
                        <div className="domain-input-group">
                            <input
                                type="text"
                                name="name"
                                value={domain.name}
                                onChange={handleChange}
                            // placeholder="example"
                            />
                            <select
                                name="tld"
                                value={domain.tld}
                                onChange={handleChange}
                                className="tld-select"
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
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={domain.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                        />
                        {/* <select
                            name="category"
                            value={domain.category}
                            onChange={handleChange}
                        >
                            <option value="Technology">Technology</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Health">Health</option>
                            <option value="Entertainment">Entertainment</option>
                        </select> */}
                    </div>

                    <div className="form-group">
                        <label>Currency</label>
                        <select
                            name="currency"
                            value={domain.currency}
                            onChange={handleChange}
                            required
                        >
                            <option value="USD">USD</option>
                            <option value="AUD">AUD</option>
                            <option value="EURO">EURO</option>
                            <option value="GBP">GBP</option>
                            <option value="CAD">CAD</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="text"
                            name="price"
                            value={domain.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                            type="date"
                            name="date"
                            value={domain.expiryDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={domain.description}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save Changes</button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate('/domains')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDomain;
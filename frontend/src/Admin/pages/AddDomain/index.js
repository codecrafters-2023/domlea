import React, { useState } from 'react';
import axios from 'axios';
import './DomainForm.css';
import AdminSidebar from '../../components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddDomainPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        tld: '.com',
        price: '',
        category: '',
        description: '',
        isPremium: false,
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/domains`, formData, {
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
                                    <option value=".io">.ca</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                                onChange={(e) => setFormData({...formData, category: e.target.value })}
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
                            <label>Description:</label>
                            <textarea
                                value={formData.description}
                                placeholder="Enter each feature on a new line..."
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {/* <div className="form-group" style={{display:"flex", alignItems:"center", gap:"10px"}}>
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
                        </div> */}

                        <button type="submit" className="btn-primary">Add Domain</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddDomainPage;
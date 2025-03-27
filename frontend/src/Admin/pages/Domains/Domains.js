import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './DomainListPage.css';
import AdminSidebar from '../../components/Navbar';
import { toast } from 'react-toastify';

const Domain = () => {
    const [domains, setDomains] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTLD, setSelectedTLD] = useState('All');
    const [tlds, setTlds] = useState([]); // State to store all TLDs
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriesRes, tldsRes] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/domains/categories`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }),
                    axios.get(`${process.env.REACT_APP_API_URL}/domains/all-tlds`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    })
                ]);

                if (categoriesRes.data.success) {
                    setCategories(categoriesRes.data.data);
                }

                if (tldsRes.data.success) {
                    setTlds(tldsRes.data.data);
                }

            } catch (error) {
                console.error('Initial data error:', error.response?.data || error.message);
                toast.error('Failed to load filter options');
            }
            finally {
                setLoadingCategories(false);
            }
        };

        fetchInitialData();
    }, []);

    // Fetch all TLDs from the backend
    // useEffect(() => {
    //     const fetchTlds = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all-tlds`, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 },
    //             });
    //             setTlds(response.data.data); // Set the fetched TLDs
    //         } catch (error) {
    //             console.error('Error fetching TLDs:', error);
    //         }
    //     };

    //     fetchTlds();
    // }, []);

    // Fetch domains from the backend
    const fetchDomains = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/domains/getDomains`, {
                params: {
                    page: currentPage,
                    search: searchTerm,
                    category: selectedCategory !== 'All' ? selectedCategory : null,
                    tld: selectedTLD !== 'All' ? selectedTLD : null,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setDomains(response.data.data);
            setTotalPages(response.data.pages);
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    };

    useEffect(() => {
        fetchDomains();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, searchTerm, selectedCategory, selectedTLD]);

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this domain?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await axios.delete(`${process.env.REACT_APP_API_URL}/domains/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            });
                            fetchDomains();
                            toast.success('Domain deleted successfully');
                        } catch (error) {
                            console.error('Error deleting domain:', error);
                        }
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <>
            <div className="admin-content">
                <AdminSidebar />
                <div className="main-content-wrapper">
                    <div className="domain-list-container">
                        <div className="header">
                            <h1>Manage Domains</h1>
                            <Link to="/addDomain" className="btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add New Domain
                            </Link>
                        </div>

                        <div className="filters">
                            <input
                                type="text"
                                placeholder="Search domains..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                disabled={loadingCategories}
                            >
                                <option value="All">All Categories</option>
                                {loadingCategories ? (
                                    <option disabled>Loading categories...</option>
                                ) : (
                                    categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))
                                )}
                                {categories.length === 0 && !loadingCategories && (
                                    <option disabled>No categories found</option>
                                )}
                            </select>

                            <select
                                value={selectedTLD}
                                onChange={(e) => setSelectedTLD(e.target.value)}
                            >
                                <option value="All">All TLDs</option>
                                {tlds.map((tld) => (
                                    <option key={tld} value={tld}>
                                        {tld}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="domains-table-wrapper">
                            <table className="domains-table">
                                <thead>
                                    <tr>
                                        <th>Domain Name</th>
                                        <th>Category</th>
                                        <th>TLD</th>
                                        <th>Expiry Date</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {domains.map((domain) => (
                                        <tr key={domain._id}>
                                            <td>{domain.name}{domain.tld}</td>
                                            <td>{domain.category}</td>
                                            <td>{domain.tld}</td>
                                            <td>{new Date(domain.expiryDate).toLocaleDateString()}</td>
                                            <td>${domain.price}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link to={`/editDomain/${domain._id}`} className="btn-edit">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(domain._id)} className="btn-delete">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Domain;
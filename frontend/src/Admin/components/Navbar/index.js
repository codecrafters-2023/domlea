// ModernSidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiGlobe, FiPlus, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { LuLayoutPanelLeft } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';
import './AdminSidebar.css'
import { useAuth } from '../../../context/AuthContext';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { logout } = useAuth()

    const links = [
        { path: '/admin', name: 'Dashboard', icon: <FiHome /> },
        { path: '/domains', name: 'Domains', icon: <FiGlobe /> },
        { path: '/addDomain', name: 'Add Domain', icon: <FiPlus /> },
        { path: '/users', name: 'Users', icon: <FiUsers /> },
        { path: '/settings', name: 'Settings', icon: <FiSettings /> },
        { path: '/', name: 'User Panel', icon: <LuLayoutPanelLeft /> },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <motion.button
                className="mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? <FiX style={{color:"#000", fontSize:"20px"}}/> : <FiMenu style={{color:"#000", fontSize:"20px"}} />}
            </motion.button>

            {/* Backdrop Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="sidebar-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                className={`modern-sidebar ${isOpen ? 'open' : ''}`}
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                {/* Logo Section */}
                <div className="sidebar-header">
                    <motion.div
                        className="logo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span>Admin</span>
                    </motion.div>
                </div>

                {/* Navigation Links */}
                <nav className="sidebar-nav">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `nav-item ${isActive ? 'active' : ''}`
                            }
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="nav-content"
                            >
                                <span className="nav-icon">{link.icon}</span>
                                <span className="nav-text">{link.name}</span>
                                <div className="active-indicator" />
                            </motion.div>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout Section */}
                <motion.div
                    className="logout-section"
                    whileHover={{ scale: 1.02 }}
                    onClick={logout}
                >
                    <FiLogOut className="logout-icon"/>
                    <span>Logout</span>
                </motion.div>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;
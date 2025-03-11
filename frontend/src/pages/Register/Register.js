import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import './index.css'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert('Passwords do not match');
            return;
        }
        try {
            await register({ email: formData.email, password: formData.password });
            navigate('/');
        } catch (error) {
            // Error handled in auth context
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                        required
                    />
                </div>
                <button className='form_button' type="submit">Register</button>
            </form>
            <div className="auth-links">
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </div>

    );
};

export default Register;
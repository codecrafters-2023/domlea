import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            // Error handled in auth context
        }
    };

    return (
        // <div className="auth-container">
        //     <h2>Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div className="form-group">
        //             <label>Email</label>
        //             <input
        //                 type="email"
        //                 value={formData.email}
        //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label>Password</label>
        //             <input
        //                 type="password"
        //                 value={formData.password}
        //                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        //                 required
        //             />
        //         </div>
        //         <button className='form_button' type="submit">Login</button>
        //     </form>
        //     <div className="auth-links">
        //         <Link to="/forgot-password">Forgot Password?</Link>
        //         <span> | </span>
        //         <Link to="/register">Create Account</Link>
        //     </div>
        // </div>
        <>
            <div className='login-page-container'>
                <div className="login-container">
                    <div className="login-box">
                        <h2 className="login-title">User Login</h2>
                        <p className="login-subtitle">Please Enter Your Email & Password</p>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <label>Email</label>
                            <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            <label>Password</label>
                            <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            <div className="options">
                                <Link to={'/forgot-password'} className="forgot-password">Forgot my password?</Link>
                            </div>
                            <button className="login-btn" type='submit'>Log In Now</button>
                        </form>
                        {/* <div className="separator">Or Log In With</div>
                    <button className="google-login">Log In With Google</button> */}
                        {/* <p className="register-link">
                        Not a member? <Link to={'/register'}>Register</Link>
                    </p> */}
                    </div>
                </div>
                <div className='bg-image'>
                    <img src={process.env.PUBLIC_URL + '/inner-banner-bg.jpg'} alt='login-bg' />
                </div>
            </div>
        </>
    );
};

export default Login;
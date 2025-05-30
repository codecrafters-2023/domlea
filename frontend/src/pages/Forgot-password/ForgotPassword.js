import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Forgot.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            navigate('/login');
        } catch (error) {
            // Error handled in auth context
        }
    };

    return (
        // <div className="auth-container">
        //     <h2>Forgot Password</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div className="form-group">
        //             <label>Email</label>
        //             <input
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <button className='form_button' type="submit">Send Reset Link</button>
        //     </form>
        //     <div className="auth-links">
        //         <Link to="/login">Remember your password? Login</Link>
        //     </div>
        // </div>
        <>
            <div className='forgot-page-container'>
                <div className="forgot-container">
                    <div className="forgot-box">
                        <h2 className="forgot-title">Forgot Password</h2>
                        <p className="forgot-subtitle">Please Enter Your Email</p>
                        <form onSubmit={handleSubmit} className='forgot-form'>
                            <label>Email</label>
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="options">
                                <Link to={'/login'} className="forgot-password">Remember your password? Login</Link>
                            </div>
                            <button className="forgot-btn" type='submit'>Send Reset Link</button>
                        </form>
                    </div>
                </div>
                <div className='bg-image'>
                    <img src={process.env.PUBLIC_URL + '/inner-banner-bg.jpg'} alt='forgot-bg' />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
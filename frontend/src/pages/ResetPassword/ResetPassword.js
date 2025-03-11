import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ResetPassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { token } = useParams();
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert('Passwords do not match');
            return;
        }
        try {
            const success = await resetPassword(token, password);
            if (success) navigate('/login');
        } catch (error) {
            // Error handled in auth context
        }
    };

    return (
        // <div className="auth-container">
        //     <h2>Reset Password</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div className="form-group">
        //             <label>New Password</label>
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label>Confirm New Password</label>
        //             <input
        //                 type="password"
        //                 value={passwordConfirm}
        //                 onChange={(e) => setPasswordConfirm(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <button className='form_button' type="submit">Reset Password</button>
        //     </form>
        //     <div className="auth-links">
        //         <Link to="/login">Back to Login</Link>
        //     </div>
        // </div>
        <>
            <div className='reset-page-container'>
                <div className="reset-container">
                    <div className="reset-box">
                        <h2 className="reset-title">Reset Password</h2>
                        <p className="reset-subtitle">Please Enter Your Password</p>
                        <form onSubmit={handleSubmit} className='reset-form'>
                            <label>New Password</label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                            <button className="reset-btn" type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
                <div className='bg-image'>
                    <img src={process.env.PUBLIC_URL + '/inner-banner-bg.jpg'} alt='reset-bg' />
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
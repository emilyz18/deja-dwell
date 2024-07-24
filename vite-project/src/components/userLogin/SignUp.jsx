import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signUpAsync } from '../../redux/user/thunks';
import './styles.css';

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const [accountType, setAccountType] = useState('');

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      UserName: data.get('userName'),
      Email: data.get('email'),
      Password: data.get('password'),
      accountType: accountType,
    };
    if (!user.UserName || !user.Email || !user.Password || !user.accountType) {
      console.log('Not allowed for empty field');
    } else {
      dispatch(signUpAsync(user));
    }
  };

  useEffect(() => {
    if (isAuth) {
      if (accountType === 'Landlord') {
        navigate('/landlordAccount/profile', {
          state: { fromSignUp: 'Landlord' },
        });
      } else if (accountType === 'Tenant') {
        navigate('/tenantAccount/profile', { state: { fromSignUp: 'Tenant' } });
      }
    }
  }, [isAuth, dispatch, navigate, accountType]);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-black-block">
          <h1 className="auth-title">Renti.</h1>
          <p className="auth-tagline">Find the perfect place.</p>
        </div>
        <div className="auth-form-container">
          <div className="auth-form-box">
            <h2 className="auth-subtitle">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="userName" className="auth-label">User Name</label>
                <input id="userName" name="userName" required className="auth-input" />
              </div>
              <div className="auth-form-group">
                <label htmlFor="email" className="auth-label">Email Address</label>
                <input id="email" name="email" required className="auth-input" />
              </div>
              <div className="auth-form-group">
                <label htmlFor="password" className="auth-label">Password</label>
                <input id="password" name="password" required className="auth-input" />
              </div>
              <div className="auth-form-group">
                <label htmlFor="account-type" className="auth-label">Account Type</label>
                <select id="account-type" value={accountType} onChange={handleChange} required className="auth-select">
                  <option value="" disabled>Select an account type</option>
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
                </select>
              </div>
              <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <div className="auth-link">
              <a href="/login">Already have an account? Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

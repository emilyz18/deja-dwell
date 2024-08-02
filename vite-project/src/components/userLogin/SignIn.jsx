import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../../redux/user/thunks';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import './styles.css';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const isLandlord = useSelector((state) => state.user.isLandlord);
  const isTenant = useSelector((state) => state.user.isTenant);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      Email: data.get('email'),
      Password: data.get('password'),
    };

    if (!user.Email || !user.Password) {
      setSnackbar({
        open: true,
        message: 'All fields are required.',
        severity: 'error',
      });
      return;
    }

    try {
      await dispatch(signInAsync(user)).unwrap();
    } catch (error) {
      //console.log('Error caught:', error.message);
      if (error.message == "Cannot set properties of null (setting 'HashKey')") {
        setSnackbar({
          open: true,
          message: 'Incorrect email or password.',
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Server Error',
          severity: 'error',
        });   
      }    
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (isAuth) {
      if (isLandlord) {
        navigate('/landlordAccount/applicants', { replace: true });
      } else if (isTenant) {
        navigate('/tenantAccount/matches', { replace: true });
      }
    }
  }, [isAuth, isLandlord, isTenant, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-black-block">
          <h1 className="auth-title">DejaDwell.</h1>
          <p className="auth-tagline">Dwell in Comfort, Like Deja Vu.</p>
        </div>
        <div className="auth-form-container">
          <div className="auth-form-box">
            <h2 className="auth-subtitle">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="email" className="auth-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="auth-input"
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="password" className="auth-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="auth-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </button>
              </div>
              <button type="submit" className="auth-button">
                Sign In
              </button>
            </form>
            <div className="auth-link">
              <a href="/register">{`Don't have an account? Sign up`}</a>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

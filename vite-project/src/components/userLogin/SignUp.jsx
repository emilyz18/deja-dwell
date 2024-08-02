import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signUpAsync } from '../../redux/user/thunks'
import { Snackbar, Alert } from '@mui/material'
import './styles.css'

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const isLandlord = useSelector((state) => state.user.isLandlord);
  const isTenant = useSelector((state) => state.user.isTenant);

  const [accountType, setAccountType] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'accountType') setAccountType(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const user = {
      UserName: data.get('userName'),
      Email: data.get('email'),
      Password: data.get('password'),
      accountType: accountType,
    }
    if (
      !user.UserName ||
      !user.Email ||
      !user.Password ||
      !user.accountType ||
      !confirmPassword
    ) {
      setSnackbar({
        open: true,
        message: 'All fields are required.',
        severity: 'error',
      })
    } else if (user.Password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match.',
        severity: 'error',
      })
    } else {
      dispatch(signUpAsync(user))
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  useEffect(() => {
    //console.log('isAuth:', isAuth, 'isLandlord:', isLandlord, 'isTenant:', isTenant);
    if (isAuth) {
      if (isLandlord) {
        navigate('/landlordAccount/profile', {
          state: { fromSignUp: 'Landlord' },
        });
      } else if (isTenant) {
        navigate('/tenantAccount/profile', { state: { fromSignUp: 'Tenant' } });
      }
    }
  }, [isAuth, navigate, accountType, isLandlord, isTenant]);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-black-block">
          <h1 className="auth-title">DejaDwell.</h1>
          <p className="auth-tagline">Dwell in Comfort, Like Deja Vu.</p>
        </div>
        <div className="auth-form-container">
          <div className="auth-form-box">
            <h2 className="auth-subtitle">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="userName" className="auth-label">
                  User Name
                </label>
                <input
                  id="userName"
                  name="userName"
                  required
                  className="auth-input"
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="email" className="auth-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
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
                  type="password"
                  required
                  className="auth-input"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="confirmPassword" className="auth-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="auth-input"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="account-type" className="auth-label">
                  Account Type
                </label>
                <select
                  id="account-type"
                  name="accountType"
                  value={accountType}
                  onChange={handleChange}
                  required
                  className="auth-select"
                >
                  <option value="" disabled>
                    Select an account type
                  </option>
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
                </select>
              </div>
              <button type="submit" className="auth-button">
                Sign Up
              </button>
            </form>
            <div className="auth-link">
              <a href="/login">Already have an account? Sign in</a>
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
  )
}

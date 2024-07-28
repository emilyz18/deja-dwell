import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signInAsync } from '../../redux/user/thunks'
import { useNavigate } from 'react-router-dom'
import './styles.css'

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.user.isAuthenticated)
  const isLandlord = useSelector((state) => state.user.isLandlord)
  const isTenant = useSelector((state) => state.user.isTenant)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const user = {
      Email: data.get('email'),
      Password: data.get('password'),
    }
    dispatch(signInAsync(user))
  }

  useEffect(() => {
    if (isAuth) {
      if (isLandlord) {
        navigate('/landlordAccount/applicants')
      } else if (isTenant) {
        navigate('/tenantAccount/matches')
      }
    }
  }, [isAuth, dispatch, isLandlord, isTenant, navigate])

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
                />
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
    </div>
  )
}

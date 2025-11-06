import React from 'react'
import Layout from '../../common/layout'
import { Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'


const Login = () => {
  return (
    <Layout>
      <div className="login-wrapper">
        <div className="login-card">
          <h3 className="title">Welcome Back 👋</h3>
          <p className="subtitle">Sign in to continue to your account</p>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-field">
                <FiMail className="icon" />
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-field">
                <FiLock className="icon" />
                <input type="password" id="password" placeholder="Enter your password" required />
              </div>
            </div>

            <div className="extra-options">
              <Link to="#" className="forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-login">Login</button>

            <p className="register-text">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login

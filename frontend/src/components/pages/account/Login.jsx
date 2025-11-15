import React, { useState, useContext } from 'react';
import Layout from '../../common/layout';

import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import { apiUrl } from '../../common/CONFIG.JSX';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../context/Auth';

const Login = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext); // ✅ Added

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Save to AuthContext
        login(result.user, result.token); // ✅ Important

        // Save token + user in localStorage
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        toast.success(result.message || 'Login successful!');

        setTimeout(() => {
          navigate('/account/dashboard');
        }, 1500);
      } 
      else if (response.status === 400 && result.errors) {
        Object.keys(result.errors).forEach((field) => {
          setError(field, {
            type: 'server',
            message: result.errors[field][0],
          });
        });

        toast.error('Please fix the highlighted errors.');
      } 
      else if (response.status === 401) {
        toast.error(result.message || 'Invalid email or password.');
      } 
      else {
        toast.error(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />

      <div id="login-wrapper">
        <div id="login-card">
          <h3 className="title">Welcome Back 👋</h3>
          <p className="subtitle">Sign in to continue to your account</p>

          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-field">
                <FiMail className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={errors.email ? 'error-input' : ''}
                  {...register('email', {
                    required: 'The Email field is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-field">
                <FiLock className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={errors.password ? 'error-input' : ''}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}
                />
              </div>
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <div className="extra-options">
              <Link to="#" className="forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="register-text">
              Don't have an account? <Link to="/account/register">Register</Link>
            </p>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

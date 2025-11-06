import React, { useState } from 'react';
import Layout from '../../common/layout';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../../common/CONFIG.JSX';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Registration successful!');
        setTimeout(() => {
          navigate('/account/login')
        }, 2000);
      } else if (response.status === 400 && result.errors) {
        // Display Laravel validation errors
        Object.keys(result.errors).forEach((field) => {
          setError(field, {
            type: 'server',
            message: result.errors[field][0]
          });
        });
        toast.error('Please fix the highlighted errors.');
      } else {
        toast.error(result.message || 'Registration failed.');
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
      <div id="register-wrapper">
        <div id="register-card">
          <h3 className="title">Create Account 🚀</h3>
          <p className="subtitle">Join us and start your journey today</p>

          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-field">
                <FiUser className="icon" />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className={errors.name ? 'error-input' : ''}
                  {...register('name', { required: 'The Name field is required' })}
                />
              </div>
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

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
                      message: 'Invalid email address'
                    }
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
                      value: 8, // matches Laravel backend
                      message: 'Password must be at least 8 characters long'
                    }
                  })}
                />
              </div>
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

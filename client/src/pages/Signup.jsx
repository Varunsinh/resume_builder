import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, name } = formData;
    if (!name) {
      setError('Name is required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    setError(null);

    try {
      console.log('Form Data:', formData);
      const response = await axiosInstance.post('/user/sign-up', formData);
      console.log('Response:', response);
      if (response.status !== 201) {
        throw new Error('Network response was not ok');
      }
      if (response.data.user_id) {
        toast.success('Registration successful!');
        console.log('Success:', response.data);
        // Redirect to /login page
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      } else {
        console.log('Sign up failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
        alert(error.response.data);
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-w-[350px] border p-5 shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
              autoComplete="name"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
              autoComplete="new-password"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="bg-[#8910F1] mt-3  text-white font-bold py-2 px-4 rounded active:scale-95 duration-150 hover:shadow-md"
          >
            Sign up
          </button>
        </form>
        <div className="flex items-center gap-x-2 mt-3">
          <p>Already have an account?: </p>

          <Link to={'/login'} className="text-[#8910F1] font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
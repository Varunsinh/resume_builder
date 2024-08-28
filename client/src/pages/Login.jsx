import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/login', loginData, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login successfully!');
        navigate('/profile');
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-20">
      <div className="min-w-[350px] border p-5 shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="bg-[#8910F1] text-white font-bold py-2 px-4 rounded active:scale-95 duration-150 hover:shadow-md"
          >
            Login
          </button>
        </form>

        <div className='flex items-center gap-x-2 mt-3'>
          <p>New User : </p>
          <Link to={'/sign-up'}  className='text-[#8910F1] font-medium hover:underline'>
            Register yourself here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
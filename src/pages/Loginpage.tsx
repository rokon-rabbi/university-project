import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import loginImage from '../assets/login.png';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
  
    const [error, setError] = useState(null);

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.post('http://localhost:8001/auth/login', values)
            .then(result => {
                console.log(result);
                if (result.data.userType === 'student') {
                    navigate('/dashboard');
                } else if (result.data.userType === 'teacher') {
                    navigate('/teacher-dashboard');
                } else {
                    setError("Invalid user type");
                }
            })
            .catch(err => console.log(err));
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col p-12 md:flex-row h-screen">
            <div className="md:w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${loginImage})` }}></div>
            <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
                {!showLoginForm && (
                    <>
                        <h1 className="text-3xl md:text-6xl text-black text-left font-bold mb-4">Welcome to Student Attendance System</h1>
                        <TypeAnimation
                            sequence={[
                                'Streamline student attendance system.',
                                1000,
                                'Seamlessly track attendance and course evaluation.',
                                1000,
                                'Seamlessly track attendance and Access records.',
                                1000,
                                'Seamlessly track attendance and view marks.',
                                1000,
                                'Seamlessly track attendance and Ensure exam entry.',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '1.3em',color:'black', height: '50px', display: 'inline-block' }}
                            repeat={Infinity}
                        />
                        <button className="bg-blue-500 mt-20 md:mt-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLoginClick}>Login</button>
                    </>
                )}
                {
                    showLoginForm && (
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 flex flex-col items-center" onSubmit={handleSubmit}>
                            <div className='text-warning'>
                                {error && error}
                            </div>
                            <h1 className="text-2xl text-center mb-6">LOGIN</h1>
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email Address
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="email"
                                    name='email'
                                    autoComplete='off'
                                    placeholder='Enter Email'
                                    value={values.email}
                                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-6 w-full relative">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    placeholder='Enter Password'
                                    value={values.password}
                                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {showPassword ? (
                                        <FaEyeSlash
                                            className="text-gray-600 mt-3 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    ) : (
                                        <FaEye
                                            className="text-gray-600 mt-3 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    )}
                                </div>
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Log in
                            </button>
                        </form>
                    )
                }
            </div>
        </div>
    );
};

export default LoginPage;
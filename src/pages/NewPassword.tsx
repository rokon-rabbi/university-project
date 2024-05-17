import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    console.log(token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/reset-password', { token, newPassword });
            alert(response.data.message);
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Error resetting password');
        }
    };

    return (
        <div className="antialiased bg-slate-200">
            <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 className="text-4xl font-medium">Set new password</h1>
                <p className="text-slate-500">Fill up the form to set a new password</p>

                <form onSubmit={handleSubmit} className="my-10">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="newPassword">
                            <p className="font-medium text-slate-700 pb-2">New Password</p>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>

                        <button type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <span>Set New Password</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;

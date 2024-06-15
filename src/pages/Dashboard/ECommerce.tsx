import React from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h1>
          <p className="text-gray-600">Your one-stop hub to manage all your activities</p>
          <Link to={"/dashboard"}>
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
              Get Started
            </button>
          </Link>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;

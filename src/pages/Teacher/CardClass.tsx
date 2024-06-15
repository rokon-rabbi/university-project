import React from 'react';

// Utility function to generate a random image URL
const getRandomImageUrl = () => `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;

const CardClass = ({ title, subtitle, teacherName }) => {
    const backgroundImageUrl = getRandomImageUrl();

    return (
        <div className="w-70 h-64 mx-auto bg-white hover:shadow-2xl   shadow-md rounded-lg overflow-hidden">
        <div 
          className="h-32 bg-cover bg-center" 
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className="bg-gray-800 bg-opacity-50 p-4 h-full flex flex-col justify-end">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <h3 className="text-sm text-gray-300">{subtitle}</h3>
          </div>
        </div>
        <div className="flex items-center p-4">
          <div className="ml-4">
            <p className="text-sm font-semibold">{teacherName}</p>
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between">
          <button className="bg-blue-500 text-xs font-extrabold text-white py-3 px-3 rounded hover:bg-blue-700">
            Take Attendance
          </button>
          <button className="bg-green-500 text-xs  font-extrabold text-white py-3 px-3 rounded hover:bg-green-700">
            View Attendance
          </button>
          </div>
        </div>
      </div>
    );
};

export default CardClass;
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RegisterRoute = ({ children }: any) => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state
    const [user, setUser] = useState<any>({ user_type: "" });
   
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoggedIn(Boolean(isAuthenticated));
        setIsLoading(false); // Set loading to false after authentication check
    }, []); // Run only once on component mount

    // Return loading indicator if still loading

    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (isLoggedIn && user.user_type==="register office") {
        return children;
      }
    return   <Navigate to="/" state={{ from: location }} replace />;
};

export default RegisterRoute;
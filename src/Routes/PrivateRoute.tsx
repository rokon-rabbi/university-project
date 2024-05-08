import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
        setIsLoggedIn(Boolean(isAuthenticated));
        setIsLoading(false); // Set loading to false after authentication check
    }, []); // Run only once on component mount

    // Return loading indicator if still loading
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }

    // You can console.log here if needed
    console.log(isLoggedIn);

    // Return children if user is logged in, otherwise redirect to login page
    return isLoggedIn ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;

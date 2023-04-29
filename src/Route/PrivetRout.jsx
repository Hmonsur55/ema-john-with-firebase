import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../components/Provider/AuthProvider';

const PrivetRout = ({ children }) => {
    const { user, loading } = useContext(authContext);
    // redirect location check loagin and  19 
    const location = useLocation();
    console.log(location)
     
    if (loading) {
        return <div>Loading........</div>
    }
    if (user) {
        return children
    }
    return (
        <Navigate to='/login' state={{from: location}} replace>

        </Navigate>
    );
};

export default PrivetRout;
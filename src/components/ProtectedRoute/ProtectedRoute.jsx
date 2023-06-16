import React from 'react';
import { GetToken, GetUserDetail } from '../../helpers/SessionHelper'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = GetToken()
    const user = GetUserDetail()
    return (
        (token && user.role === 0) ? <Outlet></Outlet> : <Navigate to='/Login'></Navigate>
    );
};

export default ProtectedRoute;
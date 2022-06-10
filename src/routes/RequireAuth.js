import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = ({children}) => {

    const { loginStatus } = useSelector(store => store.auth);
    const location = useLocation();

    return (
        loginStatus ?
            <Outlet /> :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}
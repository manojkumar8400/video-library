import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }) => {

    const { user } = useSelector(store => store.auth);
    const location = useLocation();

    return (
        user ?
            <Outlet /> :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}
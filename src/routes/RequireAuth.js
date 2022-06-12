import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {

    const { loginStatus } = useSelector(store => store.auth);
    const location = useLocation();
    const dispatch = useDispatch();
    console.log(loginStatus,"status");

    return (
        loginStatus ?
            <Outlet /> :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}
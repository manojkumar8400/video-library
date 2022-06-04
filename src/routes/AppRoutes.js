import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header, SideBar } from '../components/index';
import { Error, Explore, Home, Signin, Signup } from '../pages/index';

export const AppRoutes = () => {

    const { toggle } = useSelector((state)=>state.operator)
    return (
        <div>
            < Header />
            <div className={`${toggle ? "inherit" : "routes-container"}`}>
                <div>
                    <SideBar />
                </div>
                <Routes>
                    <Route path='/' element={< Home />} />
                    <Route path='/explore' element={< Explore />} />
                    <Route path="/signin" element={< Signin />} />
                    <Route path="/signup" element={< Signup />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </div>
    )
}

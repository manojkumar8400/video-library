import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header, SideBar } from '../components/index';
import { Explore, Home } from '../pages/index';

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
                </Routes>
            </div>
        </div>
    )
}

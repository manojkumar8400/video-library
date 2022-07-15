import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header, SideBar } from '../components/index';
import { Error, Explore, History, Home, Likes, Login, Logout, PlayList, PlayListVideos, Signup, SingleVideo, WatchLater } from '../pages/index';
import { RequireAuth } from './RequireAuth';

export const AppRoutes = () => {

    const { toggle } = useSelector((state) => state.operator)
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

                    <Route element={< RequireAuth />}>
                        <Route path='/explore/:videoId' element={< SingleVideo />} />
                        <Route path='/like' element={< Likes />} />
                        <Route path="/history" element={< History />} />
                        <Route path='/watchlater' element={< WatchLater />} />
                        <Route path="/playlist" element={< PlayList />} />
                        <Route path="/playlist/:playlistId" element={< PlayListVideos />} />
                    </Route>

                    <Route path="/login" element={< Login />} />
                    <Route path="/signup" element={< Signup />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </div>
    )
}

import React from 'react';
import "./SideBar.css";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const SideBar = () => {

    const { toggle } = useSelector((state) => state.operator)

    return (
        <aside style={{ display: toggle ? "none" : "inherit" }} className='sidebar-container sticky'>
            <ul>
                <li className='sidebar-icon'>
                    <NavLink to="/" id='sidebar-icon' className={({ isActive }) => (isActive ? "active" : undefined)}>
                        <span className='material-icons mr-8 fs-24'>home</span>
                        <h4>Home</h4>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="explore" id='sidebar-icon' className={({ isActive }) => (isActive ? "active" : undefined)}>
                        <span className='material-icons mr-8 fs-24'>explore</span>
                        <h4>Explore</h4>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="playlist" id='sidebar-icon' className={({ isActive }) => (isActive ? "active" : undefined)}>
                        <span className="material-icons mr-8 fs-24">playlist_add</span>
                        <h4>Playlist</h4>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="watchlater" id='sidebar-icon' className={({ isActive }) => (isActive ? "active" : undefined)}>
                        <span className="material-icons mr-8 fs-24">watch_later</span>
                        <h4>Watch Later</h4>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="like" id='sidebar-icon' className={({ isActive }) => (isActive ? "active" : undefined)}>
                        <span className="material-icons mr-8 fs-24">thumb_up</span>
                        <h4>Liked Video</h4>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="history" id='sidebar-icon' className={({ isActive }) => (isActive ? "active" : undefined)}>
                        <span className='material-icons mr-8 fs-24'>history</span>
                        <h4>History</h4>
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}
import React from 'react';
import "./SideBar.css";
import { useSelector } from 'react-redux';

export const SideBar = () => {

    const { toggle } = useSelector((state) => state.operator)
    return (
        <aside style={{ display: toggle ? "none" : "inherit" }} className='sidebar-container sticky'>
            <section className='sidebar-icon'>
                <span className='material-icons mr-8'>home</span>
                <h4>Home</h4>
            </section>
            <section className='sidebar-icon'>
                <span className='material-icons mr-8'>explore</span>
                <h4>explore</h4>
            </section>
            <section className='sidebar-icon'>
                <span className="material-icons mr-8">playlist_add</span>
                <h4>Playlist</h4>
            </section>
            <section className='sidebar-icon'>
                <span className="material-icons mr-8">watch_later</span>
                <h4>Watch Later</h4>
            </section>
            <section className='sidebar-icon'>
                <span className="material-icons mr-8">thumb_up</span>
                <h4>Liked Video</h4>
            </section>
            <section className='sidebar-icon'>
                <span className='material-icons mr-8'>history</span>
                <h4>History</h4>
            </section>
            <section className='sidebar-icon'>
                <span className="material-icons mr-8">account_circle</span>
                <h4>Profile</h4>
            </section>
        </aside>

    )
}
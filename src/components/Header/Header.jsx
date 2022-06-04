import React from 'react';
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import { sideToggle } from '../../app/slice/operatorSlice';
import { Link } from 'react-router-dom';

export const Header = () => {

    const dispatch = useDispatch();
    const { toggle } = useSelector((state) => state.operator);

    return (
        <header className='header-bar grid sticky p-16 z-index-1'>
            <section className="flex justify-center gap-32">
                <button onClick={() => dispatch(sideToggle(toggle ? false : true))} className="bg-transparent c-pointer b-none"><span className='material-icons fs-24 '>menu</span></button>
                <Link to="/">
                    <section className='flex justify-center'>
                        <img className='vl-logo' src="/favicon.png" alt="logo-img" />
                        <h2><span className='view-txt'>View</span><span className='tube-txt'>Tube</span></h2><sub>IN</sub>
                    </section>
                </Link>
            </section>
            <section className="flex-center">
                <input className='search-bar' type="search" placeholder='search' />
                <section className="search-btn flex">
                    <span className='material-icons fs-32 p-lr-8'>search</span>
                </section>
            </section>
            <section className="flex justify-center">
                <button className='signin-btn bg-transparent fs-16'>Sign in</button>
            </section>
        </header>
    )
}
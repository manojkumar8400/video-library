import React, { useRef } from 'react';
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import { sideToggle } from '../../app/slice/operatorSlice';
import { Link } from 'react-router-dom';
import { searchItem } from '../../app/slice/featureSlice';

export const Header = () => {

    const dispatch = useDispatch();
    const { toggle } = useSelector((state) => state.operator);
    const { status } = useSelector(store => store.auth);
    let timer = useRef(null);

    const debounce = (value, delay) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            dispatch(searchItem(value))
        },delay)
    };

    return (
        <header className='header-bar flex p-16 z-index-1'>
            <section className="flex gap-32">
                <button onClick={() => dispatch(sideToggle(toggle ? false : true))} className="bg-transparent c-pointer b-none"><span className='material-icons fs-24 '>menu</span></button>
                <Link to="/">
                    <section className='flex justify-center'>
                        <img className='vl-logo' src="/favicon.png" alt="logo-img" />
                        <h2><span className='view-txt'>View</span><span className='tube-txt'>Tube</span></h2><sup className='superscript-txt'>IN</sup>
                    </section>
                </Link>
            </section>
            <section className="flex-center">
                <input onChange={e => { debounce( e.target.value, 1000 )}} className='search-bar' type="search" placeholder='search' />
                <section className="search-btn flex">
                    <span className='material-icons fs-32 p-lr-8'>search</span>
                </section>
            </section>
            <section className="flex justify-center c-pointer">
                {
                    status ?
                        <Link to="logout" className='signin-btn bg-transparent'>
                            <span className="material-icons  fs-32">person</span>
                        </Link> :
                        <Link to="login" className='signin-btn bg-transparent'>
                            <span className="material-icons  fs-32">person</span>
                        </Link>
                }
            </section>
        </header>
    )
}
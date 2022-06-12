import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutHandler } from '../../app/slice/authSlice';

export const Logout = () => {

    const dispatch = useDispatch();
    const { status } = useSelector(store=>store.auth);
    const [backBtn, setBackBtn] = useState(false)

    return (
        <main className='logout-main-container'>
            <div className='logout-container'>
                <section className='avatar-section'>
                    <h1 className='avatar'>MK</h1>
                    <span>
                        <h3>Manoj Kumar</h3>
                        <p>manojkumar@gmail.com</p>
                    </span>
                </section>
                <button onClick={_ => { dispatch(logoutHandler()); setBackBtn(true) }} className='logout-btn'>Logout</button>
            </div>
            {
                backBtn && <div className='home-btn'>
                    <Link to="/">
                        <h3>Back To Home Page</h3>
                    </Link>
                </div>
            }
        </main >
    )
}

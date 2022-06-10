import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../../app/slice/authSlice';

export const Logout = () => {

    const dispatch = useDispatch();

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
                <button onClick={_ => {dispatch(logoutHandler()) }} className='logout-btn'>Logout</button>
            </div>
        </main>
    )
}

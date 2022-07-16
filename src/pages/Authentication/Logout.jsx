import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutHandler } from '../../app/slice/authSlice';

export const Logout = () => {

    const dispatch = useDispatch();
    const { user,lname,mail } = useSelector(store => store.auth);
    console.log(user,lname,mail);

    return (
        <main className='logout-main-container'>
            <div className='logout-container'>
                <section className='avatar-section'>
                    <img src="./assets/avatar.svg" alt="avatar" className='avatar'/>
                    <span>
                        <h3>{user} {lname}</h3>
                        <p>{mail}</p>
                    </span>
                </section>
                <Link to="/">
                    <button onClick={_ => { dispatch(logoutHandler()) }} className='logout-btn'>Logout</button>
                </Link>
            </div>
        </main >
    )
}

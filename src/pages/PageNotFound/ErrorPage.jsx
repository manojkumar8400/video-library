import React from 'react';
import { Link } from 'react-router-dom';
import "./ErrorPage.css";

export const Error = () => {
    return (
        <main>
            <section>
                <img className='error-img' src="./assets/Not-Found.svg" alt="Page Not Found" />
            </section>
            <section className='flex justify-center'>
                <Link to="/">
                    <button className='home-btn'>Home</button>
                </Link>
            </section>
        </main>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';
import "./HomeScreen.css";

export const Home = () => {

    return (
        <main className='home-container grid-center'>
            <div className='text-align'>
                <h2>Welcome to ViewTube</h2>
                <Link to="/explore">
                    <button className='explore-btn fs-16 m-tb-32'>Explore</button>
                </Link>
                <section className='flex gap-16'>
                    <button className="category-1">All</button>
                    <button className="category-1">Book Summary</button>
                    <button className="category-1">Tech Videos</button>
                    <button className="category-1">DW हिन्दी</button>
                    <button className="category-1">जोश Talks</button>
                </section>
            </div>
        </main>
    )
}
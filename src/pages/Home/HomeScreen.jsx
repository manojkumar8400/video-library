import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData } from '../../app/slice/dataSlice';
import { filterCat } from '../../app/slice/featureSlice';
import "./HomeScreen.css";

export const Home = () => {

    const dispatch = useDispatch();
    const { videos } = useSelector(store => store.data);

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    const filterCategory = videos.reduce((acc, curr) => acc.includes(curr.genre) ? acc : [...acc, curr.genre], ["All"]);

    return (
        <main className='home-container grid-center'>
            <section className='text-align'>
                <h2 className='font'>Welcome to ViewTube</h2>
                <Link to="explore">
                    <button className='explore-btn fs-16 m-tb-32'>Explore</button>
                </Link>
                <Link to="explore">
                    <section className='flex flex-wrap justify-center gap-16'>
                        {filterCategory.map(item => <button onClick={_ => dispatch(filterCat(item))} key={item} className="category">{item}</button>)}
                    </section>
                </Link>
            </section>
        </main>
    )
}
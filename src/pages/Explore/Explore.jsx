import React, { useEffect } from 'react';
import "./Explore.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../app/slice/dataSlice';
import { Loader, VIdeoCard } from '../../components/index';

export const Explore = () => {

    const { videos, status } = useSelector((store) => store.data);
    const dispatch = useDispatch();

    useEffect(_ => {
        dispatch(fetchData())
    }, [dispatch])

    const filterCategory = videos.reduce((acc, curr) => acc.includes(curr.genre) ? acc : [...acc, curr.genre], ["All"])

    return (
        <main>
            {
                status ?
                    (<Loader />) : (
                        <>
                            <section className='filter-chips sticky z-index-1'>
                                {filterCategory.map(item => <button key={item}>{item}</button>)}
                            </section>
                            <div className='item-container grid gap-16'>
                                {
                                    videos.map((video) =>
                                        <VIdeoCard video={video} key={video._id} />
                                    )
                                }
                            </div>
                        </>
                    )}
        </main>
    )
}
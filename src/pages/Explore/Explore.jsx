import React, { useEffect, useState } from 'react';
import "./Explore.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../app/slice/dataSlice';
import { Loader, VideoCard } from '../../components/index';
import { historyPost } from '../../app/slice/featureSlice';

export const Explore = () => {

    const { videos, status } = useSelector((store) => store.data);
    const dispatch = useDispatch();
    const [category, setCategory] = useState("All");


    useEffect(_ => {
        dispatch(fetchData())
    }, [dispatch])

    let filterVideos = videos;

    if (category !== "All") {
        filterVideos = videos.filter((item) => item.genre === category);
    };

    const filterCategory = videos.reduce((acc, curr) => acc.includes(curr.genre) ? acc : [...acc, curr.genre], ["All"]);

    return (
        <main>
            {
                status ?
                    (<Loader />) : (
                        <>
                            <section className='filter-chips sticky z-index-1'>
                                {filterCategory.map(item => <button onClick={_ => setCategory(item)} key={item}>{item}</button>)}
                            </section>
                            <div className='item-container grid gap-16'>
                                {
                                    filterVideos.map((video) =>
                                        <div onClick={_ => { dispatch(historyPost(video)) }} key={video._id}>
                                            <VideoCard video={video} />
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )}
        </main>
    )
}
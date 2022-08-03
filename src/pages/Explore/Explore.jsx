import React, { useEffect, useState } from 'react';
import "./Explore.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../app/slice/dataSlice';
import { Loader, PlaylistModal } from '../../components/index';
import { filterCat, historyPost, watchLaterPost, watchlaterRemove } from '../../app/slice/featureSlice';
import { addFeatures, playlistModal } from '../../app/slice/operatorSlice';


export const Explore = () => {

    const { videos, status } = useSelector((store) => store.data);
    const { filterValue, searchValue, watchlaterData } = useSelector(store => store.features);
    const dispatch = useDispatch();

    const [addModel, setAddModel] = useState(false);
    const [value, setValue] = useState();
    const { addfeaturesIcon, showPlaylistModel } = useSelector(store => store.operator);
    
    const playlistHandler = (video) => {
        setAddModel(false);
        dispatch(playlistModal(true));
        setValue(video);
    }

    useEffect(_ => {
        dispatch(fetchData())
    }, [dispatch])

    const filterData = () => {
        let filterVideos = videos;

        if (filterValue !== "All") {
            filterVideos = videos.filter((item) => item.genre === filterValue);
        };
        if (searchValue) {
            filterVideos = videos.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        };

        return (
            filterVideos
        )
    }

    const filterCategory = videos.reduce((acc, curr) => acc.includes(curr.genre) ? acc : [...acc, curr.genre], ["All"]);

    return (
        <>
            {
                status ?
                    <div className='loader'>
                        <Loader />
                    </div> : (
                        <div className='relative'>
                            <section className='filter-chips z-index-1'>
                                {filterCategory.map(item => 
                                    <button onClick={_ => dispatch(filterCat(item))} className={filterValue === item ? "filter-chips-btn" : undefined} key={item}>
                                        {item}
                                    </button>
                                )}
                            </section>
                            <section className='item-container explore-item gap-16'>
                                {
                                    filterData().map((video) =>
                                        <div className='item-section c-pointer relative' key={video._id}>
                                            <Link to={`/explore/${video._id}`} className="link">
                                                <section onClick={_ => dispatch(historyPost(video))} className='card-image'>
                                                    <img src={`https://img.youtube.com/vi/${video._id}/mqdefault.jpg`} alt="thumbnail"></img>
                                                </section>
                                                <section className='logo-title flex gap-8'>
                                                    <img className='channel-logo' src={video.logoURL} alt=" channel logo" />
                                                    <p>{video.title}</p>
                                                </section>
                                                <section className='channel-creator'>
                                                    <p>{video.creator}</p>
                                                    <section>
                                                        <span className='mr-8'>{video.views}</span>
                                                        <span>{video.releaseTime}</span>
                                                    </section>
                                                </section>
                                            </Link>
                                            <span onClick={_ => { dispatch(addFeatures(video._id)); setAddModel(addModel ? false : true) }} className='material-icons more-feature-icon-model absolute'>more_vert</span>
                                            {
                                                video._id === addfeaturesIcon && addModel ?
                                                    <section className='more-option-model absolute'>
                                                        {watchlaterData.some((checkId) => checkId._id === video._id) ? (
                                                            <button onClick={_ => { dispatch(watchlaterRemove(video._id)); setAddModel(false) }} className='flex b-none gap-8 bg-transparent'>
                                                                <span className='material-icons'>watch_later</span>
                                                                <span className='fs'>Remove From Watch Later</span>
                                                            </button>
                                                        ) : (
                                                            <button onClick={_ => { dispatch(watchLaterPost(video)); setAddModel(false) }} className='flex b-none gap-8 bg-transparent'>
                                                                <span className='material-icons'>watch_later</span>
                                                                <span className='fs'>Add to Watch later</span>
                                                            </button>
                                                        )}
                                                        <button onClick={() => playlistHandler(video)} className='flex b-none gap-8 bg-transparent'><span className="material-icons">create_new_folder</span><span className='fs'> Add to Playlist</span></button>
                                                    </section>
                                                    : ""
                                            }
                                            {
                                                showPlaylistModel ?
                                                    < PlaylistModal video={value} /> :
                                                    undefined
                                            }
                                        </div>
                                    )
                                }
                            </section>
                        </div>
                    )}
        </>
    )
}
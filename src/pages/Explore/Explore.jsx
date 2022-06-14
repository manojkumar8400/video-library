import React, { useEffect, useState } from 'react';
import "./Explore.css";
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { addfeaturesIcon, showPlaylistModel } = useSelector(store => store.operator);
    const { loginStatus } = useSelector(store => store.auth);

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
        <main>
            {
                status ?
                    (<Loader />) : (
                        <>
                            <section className='filter-chips sticky z-index-1'>
                                {filterCategory.map(item => <button onClick={_ => dispatch(filterCat(item))} key={item}>{item}</button>)}
                            </section>
                            <div className='item-container grid gap-16'>
                                {
                                    filterData().map((video) =>
                                        <div className='item-section c-pointer relative' key={video._id}>
                                            <Link to={`/explore/${video._id}`}>
                                                <section onClick={_ => dispatch(historyPost(video))} className='card-image'>
                                                    <img src={`https://img.youtube.com/vi/${video._id}/mqdefault.jpg`} alt="video_thumbnail"></img>
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
                                                        {watchlaterData.some((checkId) => checkId.id === video.id) ? (
                                                            <button onClick={_ => { loginStatus ? setAddModel(false) : navigate("/login"); dispatch(watchlaterRemove(video._id)) }} className='flex b-none gap-8 bg-transparent'>
                                                                <span className='material-icons'>watch_later</span>
                                                                <span className='fs'>Remove From Watch Later</span></button>
                                                        ) : (
                                                            <button onClick={_ => { loginStatus ? setAddModel(false) : navigate("/login"); dispatch(watchLaterPost(video)) }} className='flex b-none gap-8 bg-transparent'>
                                                                <span className='material-icons'>watch_later</span>
                                                                <span className='fs'>Add to Watch later</span></button>
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
                            </div>
                        </>
                    )}
        </main>
    )
}
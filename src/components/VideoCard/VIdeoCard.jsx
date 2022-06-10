import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./VideoCard.css";
import { addFeatures, playlistModal } from '../../app/slice/operatorSlice';
import { Link, useNavigate } from 'react-router-dom';
import { watchLaterPost, watchlaterRemove } from '../../app/slice/featureSlice';
import { PlaylistModal } from '../PlaylistModal/PlaylistModal';


export const VideoCard = ({ video }) => {

    const [addModel, setAddModel] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addfeaturesIcon, showPlaylistModel } = useSelector(store => store.operator);
    const { watchlaterData } = useSelector(store => store.features)
    const { loginStatus } = useSelector(store => store.auth);

    // const [modal, setModal] = useState(false);

    return (
        <main className='item-section c-pointer relative' key={video._id}>
            <Link to={`/explore/${video._id}`}>
                <section className='card-image'>
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
            <span onClick={_ => { dispatch(addFeatures(video._id)), setAddModel(addModel ? false : true) }} className='material-icons more-feature-icon-model absolute'>more_vert</span>

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
                        <button onClick={_ => {
                            setAddModel(false); dispatch(playlistModal(true))
                        }} className='flex b-none gap-8 bg-transparent'><span className="material-icons">create_new_folder</span><span className='fs'> Add to Playlist</span></button>
                    </section>
                    : ""
            }
            {
                showPlaylistModel ?
                    < PlaylistModal /> :
                    undefined
            }
        </main>
    )
}
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../app/slice/dataSlice';
import { likePost, likeRemove, watchLaterPost, watchlaterRemove } from '../../app/slice/featureSlice';
import { playlistModal } from '../../app/slice/operatorSlice';
import { Loader, PlaylistModal } from '../../components/index';
import "./SingleVideo.css";


export const SingleVideo = () => {

    const { videoId } = useParams();
    const { videos, status } = useSelector(store => store.data);
    const { getLikeData, watchlaterData } = useSelector(store => store.features);
    const { showPlaylistModel } = useSelector(store => store.operator)
    const { loginStatus } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(_ => {
        dispatch(fetchData())
    }, [dispatch])

    return (
        <main className='single-video-container'>
            {
                status ?
                    (< Loader />) :
                    <>
                        <section>
                            <iframe className='video-frame' src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; fullscreenn" />
                            {
                                videos.map((video) => {
                                    if (videoId === video._id) {
                                        return (
                                            <section className='single-video-section' key={video._id}>
                                                <p className='data-title'>{video.title}</p>
                                                <section className='view-old-section'>
                                                    <section>
                                                        <span className='video-view'>{video.views} views</span>
                                                        <span>{video.howOld}</span>
                                                    </section>
                                                    <section className='like-icon'>
                                                        {
                                                            getLikeData.some((i) => i._id === video._id) ? (
                                                                <section onClick={_ => { loginStatus ? dispatch(likeRemove(video._id)) : navigate("/login") }} className='s c-pointer' ><span className="material-icons like-btn-icon">thumb_up</span></section>
                                                            ) : (
                                                                <section onClick={_ => { loginStatus ? dispatch(likePost(video)) : navigate("/login") }} className='s c-pointer' ><span className="material-icons like-btn-icon">thumb_up_off_alt</span><span className='likes-count'></span></section>
                                                            )
                                                        }
                                                        {
                                                            watchlaterData.some(i => i._id === video._id) ? (

                                                                <section onClick={_ => { loginStatus ? dispatch(watchlaterRemove(video._id)) : navigate("/login") }} className='s c-pointer'><span className="material-icons like-btn-icon">watch_later</span></section>
                                                            ) : (
                                                                <section onClick={_ => { loginStatus ? dispatch(watchLaterPost(video)) : navigate("/login") }} className='s c-pointer'><span className="material-icons like-btn-icon">watch_later</span></section>
                                                            )
                                                        }
                                                        <section onClick={_=> dispatch(playlistModal(true))} className='s c-pointer'><span className="material-icons like-btn-icon">playlist_play</span></section>
                                                    </section>
                                                </section>
                                                <section className='subscriber-section'>
                                                    <img className='channel-logo' src={video.logoURL} alt="channel logo" />
                                                    <section className='channel-name-btn'>
                                                        <span>
                                                            <h4>{video.creator}</h4>
                                                            <small>{video.subscribers} subscribers</small>
                                                        </span>
                                                        <span>
                                                            <button className='subscribe-btn'>SUBSCRIBE</button>
                                                        </span>
                                                    </section>
                                                </section>
                                                <p className='description'>{video.description}</p>
                                            </section>
                                        )
                                    }
                                })
                            }
                        </section>
                        {
                            showPlaylistModel ?
                                < PlaylistModal />
                                : undefined
                        }
                    </>

            }
        </main>
    )
}

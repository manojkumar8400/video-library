import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../app/slice/dataSlice';
import { likePost, likeRemove, watchLaterPost, watchlaterRemove } from '../../app/slice/featureSlice';
import { playlistModal } from '../../app/slice/operatorSlice';
import { Loader, PlaylistModal } from '../../components/index';
import "./SingleVideo.css";
import { setLastRoute } from '../../app/slice/routeSlice';

export const SingleVideo = () => {

    const { videoId } = useParams();
    const { videos, status } = useSelector(store => store.data);
    const { getLikeData, watchlaterData } = useSelector(store => store.features);
    const { showPlaylistModel } = useSelector(store => store.operator)
    const dispatch = useDispatch();

    const [videoData, setVideoData] = useState();

    useEffect(_ => {
        dispatch(fetchData())
        dispatch(setLastRoute("/explore"));
    }, [dispatch])

    return (
        <main className='single-video-container grid gap-16'>
            {
                status ?
                    <div className='loader'>
                        <Loader />
                    </div> :
                    <>
                        <section className='i-frame-section'>
                            <iframe
                                className='video-frame'
                                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                                title={`YouTube video player - ${videoId}`}
                                allow="accelerometer; autoplay; fullscreen"
                                style={{ border: 0 }}
                            />
                            {
                                videos.map((video) => {
                                    if (videoId === video._id) {
                                        return (
                                            <section className='single-video-section' key={video._id}>
                                                <p className='data-title'>{video.title}</p>
                                                <section className='view-section flex justify-between gap-16'>
                                                    <section>
                                                        <span className='video-view'>{video.views} views</span>
                                                        <span>{video.howOld}</span>
                                                    </section>
                                                    <section className='like-icon'>
                                                        {
                                                            getLikeData.some((i) => i._id === video._id) ? (
                                                                <button
                                                                    onClick={() => { dispatch(likeRemove(video._id)) }}
                                                                    className='s c-pointer'
                                                                    aria-label="Remove Like"
                                                                    tabIndex={0}
                                                                >
                                                                    <span className="material-icons like-btn-icon">thumb_up</span>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => { dispatch(likePost(video)) }}
                                                                    className='s c-pointer'
                                                                    aria-label="Like"
                                                                    tabIndex={0}
                                                                >
                                                                    <span className="material-icons like-btn-icon">thumb_up_off_alt</span>
                                                                    <span className='likes-count'></span>
                                                                </button>
                                                            )
                                                        }
                                                        {
                                                            watchlaterData.some(wlVideo => wlVideo._id === video._id) ? (
                                                                <button
                                                                    onClick={() => { dispatch(watchlaterRemove(video._id)) }}
                                                                    className='s c-pointer'
                                                                    aria-label="Remove from Watch Later"
                                                                    tabIndex={0}
                                                                >
                                                                    <span className="material-icons like-btn-icon">watch_later</span>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => { dispatch(watchLaterPost(video)) }}
                                                                    className='s c-pointer'
                                                                    aria-label="Add to Watch Later"
                                                                    tabIndex={0}
                                                                >
                                                                    <img className='history-outline-logo like-btn-icon' src="https://cdn.iconscout.com/icon/free/png-256/watch-later-1781603-1513853.png" alt="Watch Later" />
                                                                </button>
                                                            )
                                                        }
                                                        <button
                                                            onClick={() => { dispatch(playlistModal(true)); setVideoData(video) }}
                                                            className='s c-pointer'
                                                            aria-label="Add to Playlist"
                                                            tabIndex={0}
                                                        >
                                                            <span className="material-icons like-btn-icon">playlist_play</span>
                                                        </button>
                                                    </section>
                                                </section>
                                                <section className='subscriber-section'>
                                                    <img className='channel-logo' src={video.logoURL} alt="channel logo" />
                                                    <section>
                                                        <h4>{video.creator}</h4>
                                                        <small>{video.subscribers} subscribers</small>
                                                    </section>
                                                </section>
                                                <p className='description'>{video.description}</p>
                                            </section>
                                        )
                                    }
                                    return null;
                                })
                            }
                        </section>
                        {
                            showPlaylistModel ?
                                <PlaylistModal video={videoData} />
                                : undefined
                        }
                    </>
            }
        </main>
    )
}

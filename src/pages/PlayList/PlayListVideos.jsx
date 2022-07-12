import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteVideo, getPlayLists } from '../../app/slice/playListSlice';
import "./PlayList.css";

export const PlayListVideos = () => {

    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const { playLists } = useSelector(store => store.playList);

    let playListVideo = playLists.find(item => item._id === playlistId)

    const deleteHandler = (playListVideoId, videoId) => {
        dispatch(deleteVideo({ playListVideoId, videoId }));
        dispatch(getPlayLists())
    };

    return (
        <div className='item-container grid gap-16 m-16'>
            {
                playListVideo !== undefined ?
                    playListVideo.videos.map(video =>
                        <section className='c-pointer' key={video._id}>
                            <div className='relative'>
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
                                <button onClick={_ => deleteHandler(playListVideo._id, video._id)} className="delete-icon"><span className="material-icons">delete</span></button>
                            </div>
                        </section>
                    ) :
                    <h2 className='page-status text-align mr-16'>There is no video in this playlist</h2>
            }
        </div>
    )
}
import React from 'react';
import { useDispatch } from 'react-redux';
import "./VideoCard.css";
import { Link } from 'react-router-dom';
import { historyPost } from '../../app/slice/featureSlice';

export const VideoCard = ({ video }) => {

    const dispatch = useDispatch();

    return (
        <main className='item-section c-pointer relative' key={video._id}>
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
        </main>
    )
}
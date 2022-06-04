import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./VideoCard.css";
import { addFeatures } from '../../app/slice/operatorSlice';

export const VideoCard = ({ video }) => {

    const dispatch = useDispatch();
    const [addModel, setAddModel] = useState(false);
    const { addfeaturesIcon } = useSelector((store) => store.operator);

    return (
        <main className='item-section c-pointer relative' key={video._id}>
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
            <span onClick={_ => { dispatch(addFeatures(video._id)), setAddModel(addModel ? false : true) }} className='material-icons more-feature-icon absolute'>more_vert</span>
            {
                video._id === addfeaturesIcon && addModel ?
                    <section className='more-option-model absolute'>
                        <button onClick={_ => { setAddModel(false) }} className='flex b-none gap-8 bg-transparent'><span className='material-icons'>watch_later</span><span className='fs'>add to Watch later</span></button>
                        <button onClick={_ => { setAddModel(false) }} className='flex b-none gap-8 bg-transparent'><span className="material-icons">create_new_folder</span><span className='fs'> Add to Playlist</span></button>
                    </section>
                    : ""
            }
        </main>
    )
}

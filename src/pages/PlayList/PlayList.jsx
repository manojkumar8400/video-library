import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePlayList, getPlayLists } from '../../app/slice/playListSlice';

export const PlayList = () => {

    const dispatch = useDispatch();
    const { playLists } = useSelector(store => store.playList);

    useEffect(_ => {
        dispatch(getPlayLists());
    }, [dispatch])

    return (
        <div className='video-section grid gap-16 m-16'>
            {
                playLists.length ?
                    playLists.map(i =>
                        <section className='playlist-item flex-center relative'>
                            <Link to={`/playlist/${i._id}`}>
                                <div className='playlist-children'>
                                    <h3 className='color'>{i.title}</h3>
                                </div>
                            </Link>
                            <button onClick={_ => dispatch(deletePlayList(i._id))} className="delete-icon"><span class="material-icons color">delete</span></button>
                        </section>
                    ) :
                    <h3 className='text-align'>There is no playlist</h3>
            }
        </div>
    )
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePlayList, getPlayLists } from '../../app/slice/playListSlice';
import { Loader } from '../../components';

export const PlayList = () => {

    const dispatch = useDispatch();
    const { playLists, status } = useSelector(store => store.playList);

    useEffect(_ => {
        dispatch(getPlayLists());
    }, [dispatch])

    return (
        <>
            {
                status ?
                    (<Loader />) :
                    playLists.length ?
                        <div className='video-section grid gap-16 m-16'>
                            {
                                playLists.map(i =>
                                    <section className='playlist-item flex-center relative'>
                                        <Link to={`/playlist/${i._id}`}>
                                            <div className='playlist-children'>
                                                <h3 className='color'>{i.title}</h3>
                                            </div>
                                        </Link>
                                        <button onClick={_ => dispatch(deletePlayList(i._id))} className="delete-icon"><span class="material-icons color">delete</span></button>
                                    </section>
                                )}
                        </div> :
                        <h3 className='text-align'>There is no playlist</h3>
            }
        </>
    )
}

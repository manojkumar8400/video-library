import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeGet, likeRemove } from '../../app/slice/featureSlice';
import { Loader, VideoCard } from '../../components/index';
import "./Likes.css";

export const Likes = () => {

    const dispatch = useDispatch();
    const { getLikeData, status } = useSelector(store => store.features);

    useEffect(() => {
        dispatch(likeGet())
    }, [dispatch])

    return (
        <div>
            {
                status ?
                    (<Loader />) : getLikeData.length ?
                        <section className='likedata'>
                            {
                                getLikeData.map((likeVideo) =>
                                    <div key={likeVideo._id} className="relative">
                                        < VideoCard video={likeVideo} />
                                        <button onClick={_ => dispatch(likeRemove(likeVideo._id))} className="delete-icon"><span class="material-icons">thumb_up</span></button>
                                    </div>
                                )
                            }
                        </section>
                        :
                        <h3 className='text-align m-tb-8'> There is no liked video</h3>
            }
        </div>
    )
}

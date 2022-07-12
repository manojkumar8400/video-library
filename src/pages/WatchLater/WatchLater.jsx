import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { watchLaterGet, watchlaterRemove } from '../../app/slice/featureSlice';
import { Loader, VideoCard } from '../../components/index';

export const WatchLater = () => {

    const dispatch = useDispatch();
    const { watchlaterData, status } = useSelector(store => store.features)

    useEffect(() => {
        dispatch(watchLaterGet())
    }, [dispatch])

    return (
        <>
            {
                status ?
                    <div className='loader'>
                        <Loader />
                    </div> : watchlaterData !== undefined ? watchlaterData.length ?
                        <section className='item-container grid gap-16'>
                            {
                                watchlaterData.map((watchlaterVideo) =>
                                    <div key={watchlaterVideo._id} className="relative">
                                        < VideoCard video={watchlaterVideo} />
                                        <button onClick={_ => { dispatch(watchlaterRemove(watchlaterVideo._id)) }} className="delete-icon"><span className="material-icons">watch_later</span></button>
                                    </div>
                                )
                            }
                        </section>
                        : <h3 className='page-status text-align m-tb-8'> There is no video</h3>
                        : <h3 className='page-status text-align m-tb-8'> There is no video</h3>
            }
        </>
    )
}

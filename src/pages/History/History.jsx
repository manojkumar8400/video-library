import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historyGet, historyRemove, historyRemoveAll } from '../../app/slice/featureSlice';
import { Loader, VideoCard } from '../../components/index';
import "./History.css";

export const History = () => {

    const dispatch = useDispatch();
    const { historyData, status } = useSelector(store => store.features);

    useEffect(_ => {
        dispatch(historyGet())
    }, [dispatch])

    return (
        <div>
            {
                status ?
                    <Loader /> :
                    historyData.length ?
                        <>
                            <section className="delete-all-history flex justify-between m-t-8">
                                <span className='delete-txt'>Watch History</span>
                                <button onClick={_ => dispatch(historyRemoveAll())}className=" clear-history-btn">
                                    clear history
                                </button>
                            </section>
                            <section className='likedata'>
                                {
                                    historyData.map((historyVideo) =>
                                        <div key={historyVideo._id} className="relative">
                                            < VideoCard video={historyVideo} />
                                            <button onClick={_ => dispatch(historyRemove(historyVideo._id))} className="delete-icon"><span class='material-icons'>delete</span></button>
                                        </div>
                                    )}
                            </section>
                        </>
                        :
                        <h3 className='text-align m-tb-8'>History is Empty</h3>
            }
        </div>
    )
}

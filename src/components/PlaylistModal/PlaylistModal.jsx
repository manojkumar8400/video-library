import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { playlistModal } from '../../app/slice/operatorSlice';
import "./PlaylistModal.css";


export const PlaylistModal = () => {

    const [modalValue, setModalValue] = useState("");
    const [createPlaylist, setCreatePlaylist] = useState([]);

    const dispatch = useDispatch();

    const playlist = (() => {
        if (!modalValue) {
        } else {
            setCreatePlaylist([...createPlaylist, modalValue]);
            setModalValue("");
        }
    })

    return (
        <main className='playlist-container'>
            <section className='playlist-section'>
                <section className='flex justify-between m-tb-8'>
                    <h3>Create Playlist</h3>
                    <span onClick={_=>dispatch(playlistModal(false))} class='material-icons c-pointer'>close</span>
                </section>
                <section className='input-section'>
                    <input  onChange={e => setModalValue(e.target.value)} value={modalValue} type="text" placeholder='create playlist'/>
                    <button onClick={playlist}>Create Playlist</button>
                </section>

                <section className='playlist'>
                    {
                        createPlaylist.map((playlist) => {
                            return (
                                <label htmlFor="createPlaylist">
                                    <input  onClick={_=>dispatch(playlistModal(false))} type="checkbox" id='createPlaylist' /> {playlist}
                                </label>
                            )
                        })
                    }
                </section>
            </section>
        </main>
    )
}

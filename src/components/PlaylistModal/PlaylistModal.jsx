import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./PlaylistModal.css";
import { playlistModal } from '../../app/slice/operatorSlice';
import { getPlayLists, postNewPlaylist, PostVideo } from '../../app/slice/playListSlice';

export const PlaylistModal = ({ video }) => {

    const [inputValue, setInputValue] = useState("");

    const dispatch = useDispatch();
    const { playLists } = useSelector(store => store.playList);

    const playlisthandler = () => {
        dispatch(postNewPlaylist({ title: inputValue }));
        dispatch(getPlayLists());
        setInputValue("")
    };

    const addVideo = (playListId) => {
        dispatch(playlistModal(false));
        dispatch(PostVideo({ playListId, video }));
    };

    return (
        <main className='playlist-container'>
            <section className='playlist-section'>
                <section className='flex justify-between m-tb-8'>
                    <h3>Create Playlist</h3>
                    <span onClick={_ => dispatch(playlistModal(false))} className='material-icons c-pointer'>close</span>
                </section>
                <section className='input-section'>
                    <input onChange={e => setInputValue(e.target.value)} value={inputValue} type="text" placeholder='create new playlist' />
                    <button onClick={()=>playlisthandler()}>Create Playlist</button>
                </section>
                <section className='playlist'>
                    {
                        playLists !== undefined ?
                        playLists.map(playlist =>
                            <label htmlFor="createPlaylist" key={playlist._id}>
                                <input onClick={() => addVideo(playlist._id)} type="checkbox" id='createPlaylist' value={playlist.title} /> {playlist.title}
                            </label>
                        ) :
                        ""
                    }
                </section>
            </section>
        </main>
    )
}
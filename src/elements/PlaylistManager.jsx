import React, { useState, Fragment, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline"
import PlaylistModal from "../components/PlaylistModal";
import { musicManager } from "../managers/MusicManager";

export default function PlaylistManager({ uri, currentSong, playlists, setPlaylists, currentPlaylist, setCurrentPlaylist, songName, setRequest, setCurrentTrack, sessions, currentSession, mode }) {
    const [modalOpen, setModalOpen] = useState(false);


    // handle playlist management
    const handleTyping = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        setPlaylists(p => [...p.slice(0, i), { ...p[i], playlistName: e.target.value }, ...p.slice(i + 1)])
    }
    const download = (i) => {
        const href = URL.createObjectURL(new Blob([JSON.stringify(playlists[i], null, 2)], { type: "application/json" }));
        const link = document.createElement("a");
        link.href = href;
        link.download = playlists[i].playlistName + ".playlist";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }
    const remove = (i) => {
        // clear local storage if last item removed (would have length of 1 before removal)
        if (playlists.length === 1) localStorage.removeItem("playlists");
        setCurrentPlaylist(-1);
        setPlaylists(p => p.filter((v, j) => j !== i))

    }
    const deleteSong = (i, name) => {
        setPlaylists(p => [...p.slice(0, i), { ...p[i], songs: p[i].songs.filter(v => v.name !== name) }, ...p.slice(i + 1)])
    }
    const increaseTrack = () => {
        if (mode === "Search")
            return
        setCurrentTrack(t => t + 1)
    }

    // handle input management
    const handleKeyPress = e => {
        var key = e.keyCode;
        // dont run if in input
        if (document.activeElement.tagName.toLowerCase() == "input")
            return
        // handling the "add to playlist" right arrow click requires that a playlist is target-able
        if (key == 39 || key == 50) {
            console.log("key press")
            if (currentPlaylist < 0) return
            const songToAdd = musicManager.getCurrentSong()
            if (!songToAdd) return
            increaseTrack(t => t + 1)
            if (!songToAdd) return;
            if (playlists[currentPlaylist].songs.filter(s => s.name === songToAdd.name).length > 0) return;
            setPlaylists(p => [...p.slice(0, currentPlaylist), { ...p[currentPlaylist], songs: [...p[currentPlaylist].songs, songToAdd] }, ...p.slice(currentPlaylist + 1)])
        }
        if (key == 37 || key == 49)
            increaseTrack(t => t + 1)
    }
    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);
        return () => document.removeEventListener('keyup', handleKeyPress);
    })

    return <Fragment>
        <PlaylistModal open={modalOpen} setOpen={setModalOpen} setPlaylists={setPlaylists} />
        <div className="overflow-hidden rounded-lg shadow border border-gray-200 min-w-[10rem] max-w-full w-[15rem] flex-grow justify-between flex flex-col">
            <div className="border-b border-gray-200 px-4 py-4 sm:px-6 flex items-center justify-between">
                <h2 className="text-md font-medium">Playlists</h2>
                <button
                    type="button"
                    className="transition rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setPlaylists(p => [...p, { playlistName: "Playlist", songs: [] }])}>
                    Add
                </button>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:p-6 flex-grow">
                You can have multiple playlists started at a time. You can also <button className="text-indigo-500" onClick={() => setModalOpen(true)}>upload a playlist</button> that you've begun earlier.
            </div>
        </div>
        {playlists.map((playlist, i) => {
            return <div key={i}
                data-contains={playlist.songs.some(song => currentSong && song.name === currentSong.name)}
                className="overflow-hidden rounded-lg shadow border border-gray-200 flex-grow min-w-[10rem] max-w-[25rem] w-[15rem] data-[selected=true]:ring ring-indigo-500 data-[contains=true]:ring-green-500 transition"
                onClick={() => setCurrentPlaylist(i)}
                data-selected={currentPlaylist === i}>
                <div className="border-b border-gray-200 px-4 py-4 pb-2 sm:px-6">
                    <input className="text-md w-full font-semibold border-none bg-transparent outline-none cursor-pointer" type="text" defaultValue={playlist.playlistName} placeholder="Name" onChange={(e) => handleTyping(e, i)} />
                    <span className="inline-flex gap-4 pt-2">
                        <p className="text-sm cursor-pointer text-indigo-500" onMouseUp={() => { download(i) }}>Download</p>
                        <p className="text-sm cursor-pointer text-red-500" onMouseUp={() => { remove(i) }}>Delete</p>
                    </span>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:p-3 h-full max-h-[12rem] overflow-y-scroll">
                    {playlist.songs.map((song, j) => {
                        return <div key={j}
                            data-a={currentSong && song.name === currentSong.name}
                            className="w-full flex gap-2 items-center text-gray-400 hover:text-gray-500 data-[a=true]:font-medium data-[a=true]:text-gray-600 data-[a=true]:hover:text-gray-600 cursor-pointer max-w-full whitespace-nowrap overflow-y-scroll text-ellipsis">
                            <XMarkIcon onClick={() => deleteSong(i, song.name)} className="h-4 w-4" />
                            <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap" onClick={() => { setCurrentTrack(-1); musicManager.playSongFromObject(song) }}>{song.name}</span>
                        </div>
                    })}
                </div>
            </div>
        })}

    </Fragment>
}
import React, { useState, useEffect, useRef } from "react";

import { musicManager } from "../managers/MusicManager";

export default function LibraryViewer({ }) {
    const listInnerRef = useRef();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            const data = await musicManager.getLibrary();
            setSongs(data);
        }
        init().catch(e => console.error(e));
    }, [])

    const handleScroll = async (e) => {
        if (listInnerRef.current && !loading) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
            if (isNearBottom) {
                console.log("getting next set of library")
                setLoading(true)
                await musicManager.getNextLibrary();
                setSongs(await musicManager.getLibrary())
                setLoading(false)
            }
        }
    }

    return (<div className="rounded-lg bg-white shadow w-64 flex flex-col p-4 h-96 divide-y divide-gray-200 gap-2">
        <p className="font-bold text-lg">Your Library</p>
        <div className="flex-grow overflow-y-scroll" onScroll={handleScroll} ref={listInnerRef}>
            {songs.map(song => (
                <div key={song.preview} className="flex flex-row gap-2 items-center cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap my-2" onClick={() => { musicManager.playSongFromObject(song) }}>
                    <img src={song.album.images[0].url} className="h-8 w-8 rounded-md shadow-sm" />
                    <div className="flex flex-col flex-grow">
                        <p className="font-medium text-sm">{song.name}</p>
                        <p className="font-light text-xs">{song.artists[0].name}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>)

}
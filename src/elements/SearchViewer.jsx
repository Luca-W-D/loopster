import React, { useRef, useState } from "react";

import { musicManager } from "./../managers/MusicManager";

export default function MusicViewer({ }) {
    const nameRef = useRef();
    const artistRef = useRef();
    const [results, setResults] = useState([])

    const search = async () => {
        const name = nameRef.current.value;
        const artist = artistRef.current.value;
        if (!name || !artist)
            return
        const results = await musicManager.search(name, artist);
        setResults(results);
        console.log(results);
    }

    return <div className="rounded-lg bg-white shadow w-64 flex flex-col min-h-[24rem] divide-y divide-y-200">
        <div className="flex flex-col gap-2 p-4">
            <div className="rounded-md px-3 pb-1.5 pt-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                <input
                    type="text"
                    name="Song Name"
                    className="text-sm block w-full outline-none border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    ref={nameRef}
                    placeholder="Song Name"
                />
            </div>
            <div className="rounded-md px-3 pb-1.5 pt-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                <input
                    type="text"
                    name="Song Artist"
                    className="block w-full outline-none border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    ref={artistRef}
                    placeholder="Artist"
                />
            </div>
            <button className="bg-indigo-600 text-white rounded-md py-1.5 shadow font-medium" onClick={search}>Search</button>
        </div>
        <div className="p-4 overflow-y-scroll h-64">
            {results.map(song => (
                <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={() => { musicManager.playSongFromObject(song) }}>
                    <img src={song.album.images[0].url} className="h-8 w-8 rounded-sm shadow-sm" />
                    <div className="flex flex-col flex-grow">
                        <p className="font-medium text-sm">{song.name}</p>
                        <p className="font-light text-xs">{song.artists[0].name}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>

}
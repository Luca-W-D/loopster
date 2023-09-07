import React, { useRef, useEffect } from "react";

export default function Song({ song, songName, currentTrack, setCurrentTrack, i }) {
    const ref = useRef(null);

    useEffect(() => {
        if (currentTrack === i || song.trackName === songName)
            ref.current.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
        if (song.trackName === songName && currentTrack !== i)
            setCurrentTrack(i);
    }, [songName,])

    return (<p key={i}
        ref={ref}
        data-a={currentTrack === i || song.trackName === songName}
        className="transition text-gray-400 select-none hover:text-gray-500 data-[a=true]:font-medium data-[a=true]:text-gray-600 data-[a=true]:hover:text-gray-600 cursor-pointer max-w-full whitespace-nowrap overflow-y-scroll text-ellipsis"
        onClick={() => { setCurrentTrack(i) }}>
        {song.trackName}
    </p>)
}
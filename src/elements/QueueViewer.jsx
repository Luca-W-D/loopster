import React, { useState, useEffect } from "react";

import { ArrowLeftIcon, ArrowRightIcon, ChevronDoubleRightIcon, ArrowPathIcon } from "@heroicons/react/24/outline"

import { musicManager } from "../managers/MusicManager";

import Song from "./Song";


export default function QueueViewer({ numberOfSeeks, smartSeek, currentSession, setCurrentSession, sessions, songName, setRequest, currentTrack, setCurrentTrack }) {

    const sessionUp = () => {
        if (currentSession < sessions.length - 1)
            setCurrentSession(s => s + 1);
    }

    const sessionDown = () => {
        if (currentSession > 0)
            setCurrentSession(s => s - 1);
    }

    const shuffle = () => {
        setCurrentSession(Math.floor((Math.random() * sessions.length)));
    }

    useEffect(() => {
        setCurrentTrack(-1);
        musicManager.stop();
        setRequest([]);
    }, [currentSession])

    useEffect(() => {
        if(!sessions || sessions.length == 0) return
        if (currentTrack < 0 || currentTrack > sessions[currentSession].length - 1) return;
        setRequest([sessions[currentSession][currentTrack].trackName, sessions[currentSession][currentTrack].artistName])
    }, [currentTrack])

    if (!sessions || sessions.length === 0)
        return (<div className="rounded-lg bg-white shadow w-64 flex flex-col justify-center items-center p-4 text-center py-10">
            <p className="font-bold text-lg">No history yet</p>
            <p className="font-medium text-gray-600 text-base">Upload your history files to use this feature</p>
        </div>)

    if (currentSession < 0)
        return <div className="divide-y divide-gray-200 rounded-lg bg-white shadow w-64 flex flex-col">
            <div className="px-4 py-2 pb-0 sm:p-6 sm:py-3 flex-grow overflow-y-scroll h-[18rem]">Choose a session to begin</div>
            <div className="flex flex-col items-center">
                {/* primary action buttons */}
                <div className="px-4 py-4 w-full sm:px-6 flex flex-row justify-between items-center">
                    <button disabled>
                        <ArrowLeftIcon className="h-6 w-auto text-gray-200" />
                    </button>
                    <span> ?<span className="text-gray-400"> / {sessions.length}</span></span>
                    <button onClick={() => setCurrentSession(0)} >
                        <ArrowRightIcon className="h-6 w-auto font-black" />
                    </button>
                </div>
                {/* secondary action buttons */}
                <div className="w-2/3 pb-4 sm:px-6 flex flex-row justify-between items-center">
                    <button onClick={() => shuffle()}>
                        <span className="text-blue-500 font-semibold text-xs">Shuffle</span>
                    </button>
                    <button disabled={numberOfSeeks == 0} onClick={smartSeek}>
                        <span className="disabled:text-gray-200 text-blue-500 font-semibold text-xs">Seek ({numberOfSeeks})</span>
                    </button>
                </div>
            </div>
        </div>

    return (
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow w-64 flex flex-col">
            <div className="px-4 py-2 pb-0 sm:p-6 sm:py-3 flex-grow overflow-y-scroll h-[18rem]">
                <p className="w-full text-center text-gray-400" key={-1}>{sessions[currentSession].length} songs</p>
                {sessions[currentSession].map((song, i) => {
                    return (<Song key={i} i={i} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} song={song} songName={songName} />)
                })}
            </div>
            <div className="flex flex-col items-center">
                <div className="px-4 py-4 w-full sm:px-6 flex flex-row justify-between">
                    <button disabled={currentSession <= 0} onClick={sessionDown}>
                        <ArrowLeftIcon className="h-6 w-auto disabled:text-gray-200" />
                    </button>
                    <span>{currentSession + 1}<span className="text-gray-400"> / {sessions.length}</span></span>
                    <button onClick={sessionUp} disabled={currentSession >= sessions.length - 1}>
                        <ArrowRightIcon className="h-6 w-auto disabled:text-gray-200" />
                    </button>
                </div>
                <div className="pb-4 w-2/3 sm:px-6 flex flex-row justify-between items-center">
                    <button onClick={() => shuffle()}>
                        <span className="text-blue-500 font-semibold text-xs">Shuffle</span>
                    </button>
                    <button disabled={numberOfSeeks == 0} onClick={smartSeek}>
                        <span className="disabled:text-gray-200 text-blue-500 font-semibold text-xs">Seek ({numberOfSeeks})</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
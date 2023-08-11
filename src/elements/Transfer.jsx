import React, { useState, Fragment, useEffect } from "react";

import TransferNotification from "../elements/TransferNotification";

export default function Transfer({ playlists }) {
    const [showNotification, setShowNotification] = useState(false);
    const [playlistToTransfer, setPlaylistToTransfer] = useState(null);

    useEffect(() => {
        if (!showNotification) setPlaylistToTransfer(null);
    }, [showNotification])

    return <Fragment>
        <TransferNotification show={showNotification} setShow={setShowNotification} playlist={playlistToTransfer} />
        <div className="overflow-hidden rounded-lg shadow border border-gray-200 min-w-[12rem] flex-grow">
            <div className="border-b border-gray-200 px-4 py-4 sm:px-6 flex items-center justify-between">
                <h2 className="text-md font-medium">Transfer</h2>
            </div>
            <div className="p-2 px-5 min-h-[3rem] bg-gray-50">
                {playlists.length === 0 && "Playlists will appear here for transfer."}
                <div className="bg-gray-50 px-4 py-5 sm:p-6 h-full grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {playlists.map((playlist, i) => (
                        <div onClick={() => { setPlaylistToTransfer(playlist); setShowNotification(true) }} key={i} className="transition hover:ring-2 ring-indigo-500 cursor-pointer overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                            <dt className="truncate text-sm font-medium text-gray-500">{playlist.songs.length} songs</dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{playlist.playlistName}</dd>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </Fragment>
}
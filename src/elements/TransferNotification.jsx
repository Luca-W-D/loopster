import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { ServerIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

import { tokenManager } from "../managers/TokenManager"

export default function TransferNotification({ show, setShow, playlist }) {
    const [error, setError] = useState(null);

    const transfer = async () => {
        try {
            const userId = await getUserId();
            await createPlaylist(playlist, userId)
            close();
        } catch (e) {
            console.log(e)
            setError("Transfer failed")
        }
    }

    const close = () => {
        setError(null);
        setShow(false);
    }

    const getUserId = async () => {
        const response = await axios.get(`
        https://api.spotify.com/v1/me`, { headers: { Authorization: `Bearer ${await tokenManager.getSafeToken()}` } })
        return response.data.id;
    }

    const createPlaylist = async (playlist, userId) => {
        const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            name: playlist.playlistName,
            description: "generated playlist",
            public: false,
        }, {
            headers: {
                Authorization: `Bearer ${await tokenManager.getSafeToken()}`
            },
        })
        const id = response.data.id
        return await populatePlaylist(id, playlist)
    }

    const populatePlaylist = async (id, data) => {
        const response = await axios.post(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            "uris": data.songs.map(s => s.uri),
        }, {
            headers: {
                Authorization: `Bearer ${await tokenManager.getSafeToken()}`
            },
        })
        return response;
    }

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="pointer-events-none z-100 absolute inset-0 flex items-end px-4 py-6 sm:items-end sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <ServerIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    {error ? <p>{error}</p> :
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-gray-900">Transfer Pending</p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Are you sure you'd like to upload this playlist?
                                            </p>
                                            <div className="mt-3 flex space-x-7">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => {
                                                        transfer();
                                                    }}
                                                >
                                                    Transfer
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => {
                                                        close()
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => {
                                                close()
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
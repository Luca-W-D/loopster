import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router';

import { tokenManager } from "../managers/TokenManager";

export default function LinkAccount({ example }) {
    if(example) {
        return (
            <div className="bg-white h-full flex items-center justify-center">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Demo Version
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                            In order to test the tool, you still need Spotify access. Please reach out to me for credentials to a Spotify account if you have not yet received them. (You can use your own too, if you want!)
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to={"/link"} className="text-sm font-semibold leading-6 text-gray-900">
                                I actually have my own data
                            </Link>
                            <button
                                onClick={tokenManager.requestPermissions.bind(tokenManager)}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Give Spotify permissions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-white h-full flex items-center justify-center">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Do you have your data?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        If so, great! The last thing we need is to ask for permission to listen to songs & make playlists on your behalf.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to={"/help"} className="text-sm font-semibold leading-6 text-gray-900">
                            Read how to download data
                        </Link>
                        <button
                            onClick={tokenManager.requestPermissions.bind(tokenManager)}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Give permission
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

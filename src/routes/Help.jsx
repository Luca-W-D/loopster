import React from "react";

import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { tokenManager } from "../managers/TokenManager";

import PageOverview from "./../assets/pageOverview.png";
import PageSettings from "./../assets/pageSettings.png";
import EmailConfirmation from "./../assets/emailConfirmation.png";
import { Link } from "react-router-dom";

export default function LinkAccount() {
    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-6 sm:py-12 lg:overflow-visible lg:px-0">
            {/* STEP ONE */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10 min-h-[14rem] lg:h-full pb-12">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:h-full">
                    <div className="lg:pr-4 flex justify-center flex-col">
                        <div className="lg:max-w-lg lg:pb-16">
                            <p className="text-base font-semibold leading-7 text-indigo-600">GETTING STARTED</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Download your history</h1>
                            <p className="mt-6 text-xl leading-8 text-gray-700">
                                Before you can use this tool, you must download your data from Spotify's Privacy Settings page. Spotify offers no other (easy) way to see long-term listening history.
                            </p>
                            <a href="https://www.spotify.com/us/account/privacy/"
                                target="_blank"
                                className="inline-flex my-4 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Open Spotify Privacy Settings
                                <ArrowRightIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                            </a>
                            <p className="text-xl leading-8 text-gray-700">
                                Step-by-step instructions continue below.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-1 lg:row-start-1 lg:overflow-hidden">
                    <img
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src={PageOverview}
                        alt=""
                    />
                </div>
            </div>
            {/* STEP TWO */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10 min-h-[14rem] lg:h-full">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:h-full">
                    <div className="lg:pr-4 flex">
                        <div className="lg:max-w-lg lg:pt-12 lg:flex lg:h-4/5 lg:justify-between lg:flex-col">
                            <div>
                                <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Choosing Download Options</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    At the bottom of this page, there are three possible checkboxes. This tool only requires <span className="font-bold text-black">Account Data</span>.
                                    Do not check any other boxes. <span className="font-bold text-black">After, click "Request data."</span>
                                </p>
                            </div>
                            <p className="mt-6 text-medium leading-6 text-gray-500">
                                While this download includes sensitive information, we only recommend that you upload your streaming history. Other files, like "Customer Service History"
                                will not be processed by this tool or transferred to any server.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-1 lg:row-start-1 lg:overflow-hidden">
                    <img
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src={PageSettings}
                        alt=""
                    />
                </div>
            </div>
            {/* STEP THREE */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10 min-h-[14rem] lg:h-full">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:h-full">
                    <div className="lg:pr-4 flex">
                        <div className="lg:max-w-lg lg:pt-12">
                            <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Confirming Download</h1>
                            <p className="mt-6 text-xl leading-8 text-gray-700">
                                Next, Spotify should send a confirmation email to the address associated with your Spotify account. Open the email and <span className="font-bold text-black">click "Confirm."</span>
                            </p>
                            <p className="mt-6 text-xl leading-8 text-gray-700">
                                It may take a couple days for Spotify to send you a follow-up email with a link to your download. Once it arrives, you're ready to use this tool!
                            </p>
                            <Link to="/link"
                                className="inline-flex my-4 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Launch tool
                                <ArrowRightIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-1 lg:row-start-1 lg:overflow-hidden">
                    <img
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src={EmailConfirmation}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

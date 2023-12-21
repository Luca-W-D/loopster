import { Link } from 'react-router-dom'

import Notification from '../components/Notification'

export default function Welcome() {

    return (
        <div className="bg-white h-full overflow-y-hidden">
            <div className="relative isolate px-6 pt-14 lg:px-8 h-full">
            <Notification text="Are you a recruiter or employer?" actionText={"Demo this app"} href="link/example" />
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="h-full items-center justify-center flex relative">
                    <div className="text-center pb-12 max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Loopster
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            No one knows your music better than you do.
                        </p>
                        <p className="mb-6 text-lg leading-8 text-gray-600">
                            Let your past taste make the best playlists possible.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to={"/help"}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                I need to download my data
                            </Link>
                            <Link to={"/link"} className="text-sm font-semibold leading-6 text-gray-900">
                                I have my data <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-0 -z-10 h-full transform-gpu overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f84e95] to-[#5d51ff] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

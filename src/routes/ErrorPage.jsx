import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">Something went wrong...</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sorry about that.</h1>
                {error && (<>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">{error.statusText}</h2>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-800 sm:text-2xl">{error.message}</h2>
                </>)}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back home
                    </a>
                </div>
            </div>
        </main>
    )
}
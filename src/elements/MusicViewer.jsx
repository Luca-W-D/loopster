export default function MusicViewer({ classNames, songName, art, artist }) {
    if (!songName || songName.length === 0) return <div className={`${classNames} flex-grow flex items-center gap-2 animate-pulse flex-col h-fit`}>
        <div className="w-48 w-max-full h-auto rounded-md bg-slate-200 aspect-square ">&nbsp;</div>
        <p className="w-32 h-8 rounded-md bg-slate-200"></p>
        <p className="w-24 h-6 rounded-md bg-slate-200"></p>
    </div>
    return <div className={`${classNames} flex-grow flex flex-col items-center gap-2 text-center h-fit`}>
        <img src={art} className="w-48 w-max-full h-auto rounded-md bg-slate-200 drop-shadow-lg" />
        <p className="rounded-md font-semibold">{songName}</p>
        <p className="rounded-md">{artist}</p>
    </div>
}
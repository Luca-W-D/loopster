import { useState } from "react";

import Card from "../components/Card";
import MusicViewer from "./MusicViewer";
import QueueViewer from "./QueueViewer";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Player({ sessions, numberOfSeeks, smartSeek, setRequest, currentTrack, setCurrentTrack, currentSession, setCurrentSession, songName, request, currentSong, notificationText }) {
    return <Card title="Preview Music" hideTitle={true} removePadding={true}>
        <div className="flex flex-row h-full items-center p-6">
            {notificationText ? <div className="flex-grow flex flex-col text-gray-300 font-semibold text-center">
                <ExclamationTriangleIcon className="h-24" />
                <p className="font-sm">Content Unavailable</p>
                </div> :
            currentSong ? <MusicViewer name={currentSong.name} artist={currentSong.artist} art={currentSong.art} /> : <MusicViewer />}
            <QueueViewer numberOfSeeks={numberOfSeeks} smartSeek={smartSeek} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} setRequest={setRequest} currentSession={currentSession} songName={songName} request={request} setCurrentSession={setCurrentSession} sessions={sessions} />
        </div>
    </Card>
}
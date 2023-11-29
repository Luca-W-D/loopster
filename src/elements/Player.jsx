import { useState } from "react";

import Card from "../components/Card";
import MusicViewer from "./MusicViewer";
import QueueViewer from "./QueueViewer";

export default function Player({ sessions, numberOfSeeks, smartSeek, setRequest, currentTrack, setCurrentTrack, currentSession, setCurrentSession, songName, request, currentSong }) {
    console.log("cs", currentSong)
    return <Card title="Preview Music" hideTitle={true} removePadding={true}>
        <div className="flex flex-row h-full items-center p-6">
            {currentSong ? <MusicViewer name={currentSong.name} artist={currentSong.artist} art={currentSong.art} /> : <MusicViewer />}
            <QueueViewer numberOfSeeks={numberOfSeeks} smartSeek={smartSeek} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} setRequest={setRequest} currentSession={currentSession} songName={songName} request={request} setCurrentSession={setCurrentSession} sessions={sessions} />
        </div>
    </Card>
}
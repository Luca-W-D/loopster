import { useState } from "react";

import Card from "../components/Card";
import MusicViewer from "./MusicViewer";
import QueueViewer from "./QueueViewer";

export default function Player({ sessions, numberOfSeeks, smartSeek, setRequest, currentTrack, setCurrentTrack, currentSession, setCurrentSession, songName, art, artist, request }) {

    return <Card title="Preview Music" hideTitle={true}>
        <div className="flex flex-row h-full items-center">
            <MusicViewer songName={songName} art={art} artist={artist} />
            <QueueViewer numberOfSeeks={numberOfSeeks} smartSeek={smartSeek} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} setRequest={setRequest} currentSession={currentSession} songName={songName} request={request} setCurrentSession={setCurrentSession} sessions={sessions} />
        </div>
    </Card>
}
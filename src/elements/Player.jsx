import { useState } from "react";

import Card from "../components/Card";
import MusicViewer from "./MusicViewer";
import QueueViewer from "./QueueViewer";
import LibraryViewer from "./LibraryViewer";
import SearchViewer from "./SearchViewer";
import TabMenu from "./../components/TabMenu";

export default function Player({ modes, setMode, mode, sessions, numberOfSeeks, smartSeek, setRequest, currentTrack, setCurrentTrack, currentSession, setCurrentSession, songName, request, currentSong }) {
    console.log(currentSong)
    return <Card title="Preview Music" hideTitle={true} removePadding={true}>
        <TabMenu tabs={modes} setTab={setMode} currentTab={mode} />
        <div className="flex flex-row h-full items-center p-6">
            {currentSong ? <MusicViewer name={currentSong.name} artist={currentSong.artist.name} art={currentSong.art} /> : <MusicViewer />}
            {mode === "History" ?
                <QueueViewer numberOfSeeks={numberOfSeeks} smartSeek={smartSeek} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} setRequest={setRequest} currentSession={currentSession} songName={songName} request={request} setCurrentSession={setCurrentSession} sessions={sessions} /> :
                mode === "Library" ? <LibraryViewer /> :
                    mode === "Search" ? <SearchViewer /> : <></>
            }
        </div>
    </Card>
}
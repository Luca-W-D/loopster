import React, { useState, useEffect } from "react"


import History from "../elements/History";
import Player from "../elements/Player";
import PlaylistManager from "../elements/PlaylistManager";
import Transfer from "../elements/Transfer";

import { musicManager } from "../managers/MusicManager";

export default function Dashboard() {
    const [sessions, setSessions] = useState([]);
    const [request, setRequest] = useState([]);
    const [songName, setSongName] = useState(null);
    const [art, setArt] = useState(null);
    const [artist, setArtist] = useState(null);
    const [uri, setUri] = useState(null);
    // track management
    const [currentTrack, setCurrentTrack] = useState(-1);
    const [currentSession, setCurrentSession] = useState(-1);
    // playlist management
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState(-1);
    const [numberOfSeeks, setNumberOfSeeks] = useState(0);

    useEffect(() => {
        if (playlists.length == 0) return;
        const playlistsAsStrings = JSON.stringify(playlists);
        localStorage.setItem("playlists", playlistsAsStrings);
    }, [playlists]);

    const smartSeek = () => {
        const seeks = findSeeks();
        if (seeks.length == 0) return;
        setCurrentSession(seeks[Math.floor(Math.random() * seeks.length)]);
        console.log("go to", seeks)
    }

    const findSeeks = (threshold = 5) => {
        setNumberOfSeeks(0);
        const currentPlaylistObj = playlists[currentPlaylist];
        if (!currentPlaylistObj || currentPlaylistObj.songs.length < 3) return;
        const seekable = sessions.map(session => session.filter(song => currentPlaylistObj.songs.some(savedSong => song.trackName == savedSong.trackName))).map(session => session.length);
        const maxOverlap = Math.max(...seekable);
        if (maxOverlap < threshold) return;
        const possibleSeeks = [];
        seekable.forEach((v, i) => (v >= threshold - 2) ? possibleSeeks.push(i) : null)
        const seeks = possibleSeeks.filter(session => session != currentSession);
        setNumberOfSeeks(seeks.length);
        return seeks;
    }

    useEffect(() => {
        // for the love of god, don't overwrite them
        if (playlists.length != 0) return;
        const playlistsAsStrings = localStorage.getItem("playlists");
        if (playlistsAsStrings != null) {
            setPlaylists(JSON.parse(playlistsAsStrings));
        }
    }, [])

    useEffect(() => {
        const attempt = async () => {
            if (!request || request.length != 2) {
                setSongName(null);
                return;
            }
            const info = await musicManager.setSong(request[0], request[1])
            if (!info) return
            setSongName(info.name);
            setArt(info.art);
            setArtist(info.artist);
            setUri(info.uri);
        }
        attempt().catch(e => {
            console.log("couldn't play request", e)
        })
    }, [request])

    useEffect(() => {
        findSeeks();
    }, [currentPlaylist, currentTrack])

    return <div className="min-h-full flex flex-col gap-2 pt-8">
        <div className="mx-auto max-w-7xl px-4 w-full sm:px-6 lg:px-8 h-full">
            <div className="mx-auto max-w-3xl h-full flex flex-col gap-5 pb-5">
                <History sessions={sessions} setSessions={setSessions} />
                {sessions.length > 0 &&
                    <Player numberOfSeeks={numberOfSeeks} smartSeek={smartSeek} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} currentSession={currentSession} setCurrentSession={setCurrentSession} sessions={sessions} request={request} songName={songName} setRequest={setRequest} art={art} artist={artist} />
                }
                <div className="flex flex-row flex-wrap gap-5 justify-between">
                    <PlaylistManager currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} uri={uri} playlists={playlists} setPlaylists={setPlaylists} sessions={sessions} currentSession={currentSession} songName={songName} setRequest={setRequest} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
                </div>
                {playlists.length > 0 &&
                    <Transfer playlists={playlists} />
                }
            </div>
        </div>
    </div>
}
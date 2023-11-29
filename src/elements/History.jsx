import React, { useState, useEffect } from "react";
import axios from "axios";

import { tokenManager } from "../managers/TokenManager";
import { musicManager } from "../managers/MusicManager";

import Card from "../components/Card";
import UploadModal from "../components/UploadModal";


export default function History({ history, setHistory, wipe, sessions, setSessions, setCurrentSong }) {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if(wipe) {
            setHistory([])
            setCurrentSong(null);
        };
    }, [])

    useEffect(() => {
        if (!history || history.length < 5) {
            setSessions([]);
            return
        };
        var s = [[]];
        for (var x = 1; x < history.length; x++) {
            const thisSong = history[x];
            const lastSong = history[x - 1];
            // calculate if this is a new session
            // time diff in minutes
            const timeDifference = Math.abs(new Date(thisSong.endTime) - new Date(lastSong.endTime)) / 1000 / 60;
            if (timeDifference > 12) s.push([]);
            if (thisSong.ms_played < 30000) continue;
            const target = s[s.length - 1];
            if (target.filter(obj => obj.trackName == thisSong.trackName).length > 0) continue;
            target.push(thisSong);
        }
        s = s.filter(ses => ses.length > 15)
        try {
            sessionStorage.setItem("history", JSON.stringify(history))
        } catch (e) {
            console.error(e);
        }
        setSessions(s);
    }, [history])

    useEffect(() => {
        if (sessions.length > 0 || wipe) return;
        const possibleHistory = sessionStorage.getItem("history");
        if (!possibleHistory) return;
        try {
            const asJson = JSON.parse(possibleHistory);
            setHistory(asJson);
        } catch (e) {
            console.log("couldn't load history")
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem("example_data") && !wipe) {
            localStorage.removeItem("example_data")
            populateExampleData();
        }
    })

    const populateExampleData = async () => {
        const response = await axios.get("/example_data.json");
        setHistory(response.data)
    }

    if (history.length === 0) return (<>
        <UploadModal open={modalOpen} setOpen={setModalOpen} setHistory={setHistory} />
        <Card title="Your history" minorActionName="Use Example Data" minorAction={() => {populateExampleData()}} actionName="Upload" action={() => setModalOpen(true)} hideBody={true} />
    </>)

    return <Card title="Your history" actionName="Upload" action={() => setModalOpen(true)} secondActionName="Clear" secondAction={() => { sessionStorage.removeItem("history"); setCurrentSong(null); musicManager.stop(); setHistory([]) }}>
        <UploadModal open={modalOpen} setOpen={setModalOpen} setHistory={setHistory} />
        <div>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {[
                    { name: 'Session Count', stat: sessions.length },
                    { name: 'Total Minutes Listened', stat: Math.floor(history.reduce(((pV, v) => { return pV + v.msPlayed }), 0) / 60000).toLocaleString() },
                    { name: '% Skipped', stat: Math.floor(history.filter(v => v.msPlayed < 30000).length / history.length * 1000) / 10 },
                ].map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </Card>
}
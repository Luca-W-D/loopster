import React, { useState } from "react";
import axios from "axios";

import { tokenManager } from "./TokenManager";

export class MusicManager {
    constructor() {
        this.musicPlayer = [];
        this.songName = null;
        this.art = null;
        this.artist = null;
    }

    async search(name, artist) {
        if (!tokenManager.isReady()) return;

        let body = new URLSearchParams({
            q: (`track:${name} artist:${artist}`),
            type: "track",
            market: "US",
            limit: 1
        });

        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${await tokenManager.getSafeToken()}`
            },
            params: body
        }).catch(e => {
            tokenManager.clearToken();
            return false;
        })
        try {
            const tracks = response.data.tracks.items[0];
            if (!tracks) return false;
            return tracks;
        } catch (e) {
            return false;
        }
    }

    async setSong(name, artist) {
        const entry = await this.search(name, artist)
        const songName = entry.name;
        const spotifyId = entry.uri
        const art = entry.album.images[0].url;
        let preview = entry.preview_url
        if (!preview) {
            try {
                const newLink = entry.href
                const otherPreview = await axios.get(newLink, { headers: { Authorization: `Bearer ${await tokenManager.getSafeToken()}` } }).catch(e => { console.log("backup preview failed", e) })
                preview = otherPreview.data.preview_url;
            } catch (e) {
                console.log("backup preview finding failed")
            }
        }
        const newAudio = new Audio(preview)
        this.addAudio(newAudio)
        return {
            "name": songName,
            "uri": spotifyId,
            "artist": artist,
            "art": art,
            "preview": preview
        }
    }

    async stop() {
        for (var x = 0; x < this.musicPlayer.length; x++) {
            this.musicPlayer[x].pause();
        }
        this.musicPlayer = [];
    }

    async addAudio(audio) {
        await audio.play();
        this.musicPlayer.push(audio);
        for (var x = 0; x < this.musicPlayer.length - 1; x++) {
            this.musicPlayer[x].pause();
        }
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}

export const musicManager = new MusicManager();
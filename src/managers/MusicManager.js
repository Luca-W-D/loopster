import React, { useState } from "react";
import axios from "axios";

import { tokenManager } from "./TokenManager";

export class MusicManager extends React.Component {
  constructor() {
    super();
    this.musicPlayer = [];
    this.currentSong = null;
    this.feeder = null;
    this.nextLibraryUrl = "https://api.spotify.com/v1/me/tracks?limit=25";
    this.library = [];
  }

  async getLibrary() {
    if (!tokenManager.isReady()) return [];
    if (this.library.length > 0) return this.library;
    await this.getNextLibrary();
    return this.library;
  }

  async getNextLibrary() {
    if (!this.nextLibraryUrl) return;
    const library = await axios
      .get(this.nextLibraryUrl, {
        headers: {
          Authorization: `Bearer ${await tokenManager.getSafeToken()}`,
        },
      })
      .catch((e) => {
        console.log("failed to get library", e);
      });
    const libraryData = library.data;
    this.nextLibraryUrl = libraryData.next;
    this.library = [
      ...this.library,
      ...libraryData.items.map((item) => item.track),
    ];
    this.library = this.library.filter(
      (song, i) => this.library.map((s) => s.id).indexOf(song.id) == i
    );
  }

  async search(name, artist) {
    if (!tokenManager.isReady()) return;

    let body = new URLSearchParams({
      q: `track:${name} artist:${artist}`,
      type: "track",
      market: "US",
      limit: 1,
    });

    const response = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${await tokenManager.getSafeToken()}`,
        },
        params: body,
      })
      .catch((e) => {
        tokenManager.clearToken();
        return false;
      });
    try {
      const tracks = response.data.tracks.items;
      if (!tracks) return false;
      return tracks;
    } catch (e) {
      return false;
    }
  }

  async searchAndPlay(name, artist) {
    const entries = await this.search(name, artist);
    const entry = entries[0];
    const songName = entry.name;
    const spotifyId = entry.uri;
    const art = entry.album.images[0].url;
    let preview = entry.preview_url;
    if (!preview) {
      try {
        const newLink = entry.href;
        const otherPreview = await axios
          .get(newLink, {
            headers: {
              Authorization: `Bearer ${await tokenManager.getSafeToken()}`,
            },
          })
          .catch((e) => {
            console.log("backup preview failed", e);
          });
        preview = otherPreview.data.preview_url;
      } catch (e) {
        console.log("backup preview finding failed");
      }
    }
    const newAudio = new Audio(preview);
    this.addAudio(newAudio);
    const thisSong = {
      name: songName,
      uri: spotifyId,
      artist: artist,
      art: art,
      preview: preview,
    };
    this.propogateCurrentSong(thisSong);
    return thisSong;
  }

  propogateCurrentSong(song) {
    if (this.feeder) this.feeder(song);
    this.currentSong = song;
  }

  async playSongFromObject(song) {
    song["artist"] = song["artists"][0];
    song["art"] = song.album.images[0].url;
    // patching preview
    let preview = song.preview_url;
    if (!preview) {
      try {
        const newLink = song.href;
        const otherPreview = await axios
          .get(newLink, {
            headers: {
              Authorization: `Bearer ${await tokenManager.getSafeToken()}`,
            },
          })
          .catch((e) => {
            console.log("backup preview failed", e);
          });
        preview = otherPreview.data.preview_url;
      } catch (e) {
        console.log("backup preview finding failed");
      }
    }
    song["preview"] = preview;
    const newAudio = new Audio(preview);
    this.addAudio(newAudio);
    this.propogateCurrentSong(song);
  }

  async stop() {
    for (var x = 0; x < this.musicPlayer.length; x++) {
      this.musicPlayer[x].pause();
    }
    this.propogateCurrentSong(null);
    this.musicPlayer = [];
  }

  getCurrentSong() {
    return this.currentSong;
  }

  async addAudio(audio) {
    await audio.play();
    this.musicPlayer.push(audio);
    for (var x = 0; x < this.musicPlayer.length - 1; x++) {
      this.musicPlayer[x].pause();
    }
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setFeeder(currentSong, func) {
    this.feeder = func;
  }
}

export const musicManager = new MusicManager();

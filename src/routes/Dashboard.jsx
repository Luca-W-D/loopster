import React, { useState, useEffect, Fragment } from "react";

import History from "../elements/History";
import Player from "../elements/Player";
import PlaylistManager from "../elements/PlaylistManager";
import Transfer from "../elements/Transfer";
import TutorialModal from "../elements/TutorialModal";
import FooterCard from "../components/FooterCard";
import TutorialProgression from "../elements/TutorialProgression";
import Notification from "../components/Notification";

import { musicManager } from "../managers/MusicManager";

import { LifebuoyIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  // tutorial management
  const [tutorialState, setTutorialState] = useState(-1);
  const [showTutorialPrompt, setShowTutorialPrompt] = useState(
    localStorage.getItem("tutorialPrompted") === null ||
      localStorage.getItem("tutorialPrompted") === undefined
  );
  // data management
  const [history, setHistory] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [request, setRequest] = useState([]);
  const [songName, setSongName] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
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
  // error notification managmeent
  const [notificationText, setNotificationText] = useState(null);
  const [notificationTimer, setNotificationTimer] = useState(null);

  // store local playlists
  useEffect(() => {
    if (playlists.length == 0) return;
    const playlistsAsStrings = JSON.stringify(playlists);
    localStorage.setItem("playlists", playlistsAsStrings);
  }, [playlists]);

  // allow child components to request song changes
  useEffect(() => {
    const attempt = async () => {
      if (!request || request.length != 2) {
        setSongName(null);
        return;
      }
      const info = await musicManager.searchAndPlay(request[0], request[1]);
      if (!info) return;
      setSongName(info.name);
      setArt(info.art);
      setArtist(info.artist);
      setUri(info.uri);
    };
    attempt().catch((e) => {
      console.log("couldn't play request", e);
      musicManager.stop()
      setRequest(null)
      setNotificationText("Spotify doesn't allow streaming of this song on a free account")
      if(notificationTimer) clearTimeout(notificationTimer)
      setNotificationTimer(setTimeout(() => {
        setNotificationText(null)
        setNotificationTimer(null);
      }, 3000));
    });
  }, [request]);

  // populate what seeks are available
  useEffect(() => {
    findSeeks();
  }, [currentPlaylist, currentTrack]);

  // connect music manager to current song state
  useEffect(() => {
    musicManager.setFeeder(currentSong, setCurrentSong);
  }, []);

  const smartSeek = () => {
    const seeks = findSeeks();
    if (seeks.length == 0) return;
    setCurrentSession(seeks[Math.floor(Math.random() * seeks.length)]);
  };

  const findSeeks = (threshold = 3) => {
    setNumberOfSeeks(0);
    const currentPlaylistObj = playlists[currentPlaylist];
    if (!currentPlaylistObj || currentPlaylistObj.songs.length < 3) return;
    const seekable = sessions
      .map((session) =>
        session.filter((song) =>
          currentPlaylistObj.songs.some(
            (savedSong) => song.trackName == savedSong.trackName
          )
        )
      )
      .map((session) => session.length);
    const maxOverlap = Math.max(...seekable);
    if (maxOverlap < threshold) return;
    const possibleSeeks = [];
    seekable.forEach((v, i) => (v >= threshold ? possibleSeeks.push(i) : null));
    const seeks = possibleSeeks.filter((session) => session != currentSession);
    setNumberOfSeeks(seeks.length);
    return seeks;
  };

  useEffect(() => {
    // for the love of god, don't overwrite them
    if (playlists.length != 0) return;
    const playlistsAsStrings = localStorage.getItem("playlists");
    if (playlistsAsStrings != null) {
      setPlaylists(JSON.parse(playlistsAsStrings));
    }
  }, []);

  useEffect(() => {
    if (tutorialState >= 9) {
      musicManager.stop();
      setTutorialState(-1);
      setRequest([]);
    }
  }, [tutorialState]);

  useEffect(() => {
    musicManager.stop();
  }, [sessions]);

  const tutorialTitles = [
    "Welcome!",
    "History",
    "Explorer",
    "Explorer",
    "Playlists",
    "Playlists",
    "Playlists",
    "Transfer Playlists",
    "End",
  ];
  const tutorialContent = [
    "Welcome to the dashboard! Here, different components will appear above as we progress through the tutorial. Generally, start at the top of the list and work your way down.",
    "This is the first component. Here, you can upload your own Spotify data. If you're not quite ready to upload your data yet, you can use some example data. Start by choosing one of these two options.",
    "Next is the explorer. The web app uses the history you uploaded and splits your music into different listening sessions. Each session is a continuous period in which you played music. Go ahead and use the right arrow to select your first session.",
    "Now, click the first song in the session. This will play a snippet of the song, so use headphones if you'd prefer.",
    'Finally, you can manage different playlists with this last component. Start your first playlist by clicking "add", and then click on the title to rename it. Once you\'re done typing the name, click anywhere else to stop typing.',
    "Almost done! Now, we can add music to the playlist. As you go through a session, hit the right arrow key on your keyboard to add a song to the playlist. Use the left arrow key to skip the song. Or, use 1 to skip and 2 to add",
    "Sometimes, people want to sort songs into different playlists. If you'd like, add a new playlist; after, clicking either playlist will select which you'd like you're currently adding to. The currently-active playlist will have a purple ring.",
    "Once you're done, scroll down to \"transfer\" and click a playlist you'd like to upload to your Spotify account. A notification will appear asking you to confirm the action.",
    "That's it! If you'd like to go through the tutorial again, you can always find the help button in the bottom left. Click next to end the tutorial.",
  ];

  if (tutorialState >= 0) {
    return (
      <div className="min-h-full flex flex-col gap-2 pt-8 relative">
        {notificationText && <Notification text={notificationText} />}
        <div className="mx-auto max-w-7xl px-4 w-full sm:px-6 lg:px-8 h-full">
          <div className="mx-auto max-w-3xl h-full flex flex-col gap-5 pb-5">
            {tutorialState >= 1 ? (
              <History
                history={history}
                setHistory={setHistory}
                wipe={true}
                setCurrentSong={setCurrentSong}
                sessions={sessions}
                setSessions={setSessions}
              />
            ) : (
              <div className="w-full h-32 border border-gray-400 rounded-md relative  flex items-center justify-center">
                <div className="bg-gray-200 animate-pulse w-full h-full absolute top-0 left-0 z-0" />
                <p className="z-10 text-gray-500 font-semibold">
                  Components will appear here
                </p>
              </div>
            )}
            {tutorialState >= 2 && (
              <Player
                currentSong={currentSong}
                numberOfSeeks={numberOfSeeks}
                smartSeek={smartSeek}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                currentSession={currentSession}
                setCurrentSession={setCurrentSession}
                sessions={sessions}
                request={request}
                songName={songName}
                setRequest={setRequest}
                art={art}
                artist={artist}
                notificationText={notificationText}
              />
            )}
            {tutorialState >= 4 && (
              <div className="flex flex-row flex-wrap gap-5 justify-between">
                <PlaylistManager
                  currentSong={currentSong}
                  currentPlaylist={currentPlaylist}
                  setCurrentPlaylist={setCurrentPlaylist}
                  uri={uri}
                  playlists={playlists}
                  setPlaylists={setPlaylists}
                  sessions={sessions}
                  currentSession={currentSession}
                  songName={songName}
                  setRequest={setRequest}
                  currentTrack={currentTrack}
                  setCurrentTrack={setCurrentTrack}
                />
              </div>
            )}
            {tutorialState >= 7 && playlists.length > 0 && (
              <Transfer playlists={playlists} />
            )}
            <FooterCard
              title={tutorialTitles[tutorialState]}
              actionName={"Next"}
              action={() => setTutorialState((s) => s + 1)}
              secondActionName={"Previous"}
              secondAction={() => setTutorialState((s) => (s > 0 ? s - 1 : s))}
            >
              <div className="flex flex-col gap-4">
                <TutorialProgression
                  tutorialState={tutorialState}
                  setTutorialState={setTutorialState}
                />
                <p className="text-lg text-gray-700">
                  {tutorialContent[tutorialState]}
                </p>
              </div>
            </FooterCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col gap-2 pt-8 relative">
      {notificationText && <Notification text={notificationText} />}
      <TutorialModal
        open={showTutorialPrompt}
        setOpen={setShowTutorialPrompt}
        title="You look new here!"
        text="Would you like to enable the tutorial?"
        action={() => setTutorialState(0)}
      />
      <div className="mx-auto max-w-7xl px-4 w-full sm:px-6 lg:px-8 h-full">
        <div className="mx-auto max-w-3xl h-full flex flex-col gap-5 pb-5">
          <History
            history={history}
            setHistory={setHistory}
            setCurrentSong={setCurrentSong}
            sessions={sessions}
            setSessions={setSessions}
          />
          <Player
            currentSong={currentSong}
            numberOfSeeks={numberOfSeeks}
            smartSeek={smartSeek}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            currentSession={currentSession}
            setCurrentSession={setCurrentSession}
            sessions={sessions}
            request={request}
            songName={songName}
            setRequest={setRequest}
            art={art}
            artist={artist}
            notificationText={notificationText}
          />
          <div className="flex flex-row flex-wrap gap-5 justify-between">
            <PlaylistManager
              currentSong={currentSong}
              currentPlaylist={currentPlaylist}
              setCurrentPlaylist={setCurrentPlaylist}
              uri={uri}
              playlists={playlists}
              setPlaylists={setPlaylists}
              sessions={sessions}
              currentSession={currentSession}
              songName={songName}
              setRequest={setRequest}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
            />
          </div>
          {playlists.length > 0 && <Transfer playlists={playlists} />}
        </div>
      </div>
      <button
        onClick={() => setShowTutorialPrompt(true)}
        className="fixed bottom-4 left-4 rounded-full border-2 border-red-400 bg-red-50 p-3"
      >
        <LifebuoyIcon className="h-10 w-10 text-red-400" />
      </button>
    </div>
  );
}

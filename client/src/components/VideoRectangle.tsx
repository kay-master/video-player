import * as React from "react";
import {
  Player,
  ControlBar,
  PlayerReference,
  BigPlayButton,
  PlayerState,
} from "video-react";
import _get from "lodash/get";
import { useNavigate, useParams } from "react-router-dom";

import HLSSource from "./HLSSource";
import { VideoDataInterface } from "../interfaces/video.interface";
import {
  VideoControls,
  VideoPlayerContainer,
  VideoRectWrapper,
} from "../styles/video-rectangle.styled";
import { VideoPlayerPlaceHolder } from "../styles/video-player.styled";
import formatTime from "../utils/time";
import VolumeInput from "./VolumeInput";
import ErrorBoundary from "./ErrorBoundary";

interface Props {
  videoSelected: number;
  videos: VideoDataInterface[];
}

export default function VideoRectangle(props: Props) {
  const { videoSelected, videos } = props;
  const [videoSource, setVideoSource] = React.useState<string | null>(null);
  const { videoTitle } = useParams<{ videoTitle: string }>();
  const [show, setShow] = React.useState(false);
  const [destroy, setDestroy] = React.useState(false);
  const [canNavigate, setCanNavigate] = React.useState({
    prev: false,
    next: false,
  });
  const playerRef = React.useRef<PlayerReference | null>(null);
  const [playerState, setPlayerState] = React.useState<PlayerState>();

  const history = useNavigate();

  function handleStateChange(state: PlayerState) {
    setPlayerState(state);
  }

  const stateWatch = React.useCallback(() => {
    const refChange = setInterval(() => {
      if (playerRef.current) {
        clearInterval(refChange);
        playerRef.current.subscribeToStateChange(handleStateChange);
      }
    }, 1000);
  }, []);

  React.useEffect(() => {
    let prev = true;
    let next = true;

    if (videos.length > 1) {
      if (videoSelected === 0) {
        prev = false;
      }

      if (videoSelected === videos.length - 1) {
        next = false;
      }
    } else {
      prev = false;
      next = false;
    }

    setCanNavigate({
      next,
      prev,
    });
  }, [videoSelected, videos]);

  React.useEffect(() => {
    if (videoSelected >= 0) {
      const source = _get(videos, `${videoSelected}.path`, "");

      setDestroy(true);

      setTimeout(() => {
        setDestroy(false);

        stateWatch();

        setVideoSource(source);
      }, 1000);
    }
  }, [videoSelected, videos, stateWatch]);

  React.useEffect(() => {
    const { Hls } = window as never as { Hls: any };

    const checkingInterval = setInterval(() => {
      if (Hls) {
        clearInterval(checkingInterval);
        setShow(true);
      }
    }, 1000);
  }, []);

  function isPaused() {
    if (!playerState) {
      return true;
    }

    return playerState.paused;
  }

  function playBtn() {
    if (!playerState) {
      return;
    }

    if (playerState?.paused) {
      playerRef.current?.play();
    } else {
      playerRef.current?.pause();
    }
  }

  function progressCheck() {
    if (playerState) {
      return `${(playerState.currentTime / playerState.duration) * 100}%`;
    }

    return "0%";
  }

  function displayTime() {
    if (playerState) {
      return `${formatTime(playerState.currentTime)} / ${formatTime(
        playerState.duration
      )}`;
    }

    return `00:00:00 / 00:00:00`;
  }

  function onVolumeChange(value: number) {
    if (playerRef.current) {
      playerRef.current.volume = value;
    }
  }

  function toggleFullScreen() {
    if (playerRef.current) {
      playerRef.current.toggleFullscreen();
    }
  }

  function selectVideo(index: number) {
    history(`/watch/${videos[index].name.toLowerCase()}`);
  }

  function prevVideo() {
    const prev = videoSelected - 1;

    if (prev >= 0) {
      selectVideo(prev);
    }
  }

  function nextVideo() {
    const next = videoSelected + 1;

    if (next <= videos.length - 1) {
      selectVideo(next);
    }
  }

  function canAutoPlay(videoIndex: number) {
    if (videoIndex >= 0) {
      return videoTitle &&
        String(videoTitle).toLowerCase() ===
          videos[videoIndex].name.toLowerCase()
        ? true
        : false;
    }

    return false;
  }

  return (
    <VideoRectWrapper>
      {show ? (
        <>
          {!destroy && videoSelected >= 0 && (
            <VideoPlayerContainer>
              <ErrorBoundary>
                <Player ref={playerRef} autoPlay={canAutoPlay(videoSelected)}>
                  <HLSSource isVideoChild src={videoSource} />

                  <BigPlayButton position="center" />

                  <ControlBar autoHide={false} disableCompletely></ControlBar>
                  <VideoControls>
                    <div>
                      <div className="controls-btn">
                        <button
                          title="Previous"
                          disabled={!canNavigate.prev}
                          onClick={() => prevVideo()}
                        >
                          <i className="fa-solid fa-backward-step" />
                        </button>
                        <button
                          title={isPaused() ? "Play" : "Pause"}
                          onClick={() => playBtn()}
                        >
                          <i
                            className={`fa-solid fa-${
                              isPaused() ? "play" : "pause"
                            }`}
                          />
                        </button>
                        <button
                          title="Next"
                          disabled={!canNavigate.next}
                          onClick={() => nextVideo()}
                        >
                          <i className="fa-solid fa-forward-step" />
                        </button>
                      </div>
                      <div className="progress-track">
                        <div
                          style={{
                            width: progressCheck(),
                          }}
                        />
                      </div>
                      <div className="time">{displayTime()}</div>
                      <VolumeInput onChange={onVolumeChange} />
                      <div
                        className="full-screen"
                        onClick={() => {
                          toggleFullScreen();
                        }}
                        tabIndex={0}
                      >
                        <i
                          className={`fa-solid fa-${
                            playerState && playerState.isFullscreen
                              ? "minimize"
                              : "maximize"
                          }`}
                        />
                      </div>
                    </div>
                  </VideoControls>
                </Player>
              </ErrorBoundary>
            </VideoPlayerContainer>
          )}

          {destroy && videoSelected >= 0 && (
            <VideoPlayerPlaceHolder>
              Loading "{videos[videoSelected].name}" ...
            </VideoPlayerPlaceHolder>
          )}

          {videoSelected < 0 && (
            <VideoPlayerPlaceHolder>
              Select a video to start playing
            </VideoPlayerPlaceHolder>
          )}
        </>
      ) : (
        <VideoPlayerPlaceHolder>Loading player ...</VideoPlayerPlaceHolder>
      )}
    </VideoRectWrapper>
  );
}

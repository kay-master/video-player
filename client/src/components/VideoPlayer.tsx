import * as React from "react";
import VideoList from "./VideoList";
import VideoRectangle from "./VideoRectangle";
import { VideoDataInterface } from "../interfaces/video.interface";
import {
  VideoPlayerH1,
  VideoPlayerWrapper,
} from "../styles/video-player.styled";

interface Props {
  videoSelected: number;
  videos: VideoDataInterface[];
}

export default function VideoPlayer(props: Props) {
  const { videoSelected, videos } = props;

  return (
    <VideoPlayerWrapper>
      <VideoPlayerH1>
        <span>Video</span>
        <span>Player</span>
      </VideoPlayerH1>
      <div>
        <VideoRectangle videoSelected={videoSelected} videos={videos} />
        <VideoList videos={videos} />
      </div>
    </VideoPlayerWrapper>
  );
}

import * as React from "react";
import { Helmet } from "react-helmet";

import VideoPlayer from "../../components/VideoPlayer";
import { useAppSelector } from "../../store/hooks";
import { BodyWrapper } from "../../styles/layout.styled";

function VideoPlayerView() {
	const { videoSelected, videos } = useAppSelector((state) => state.player);

	return (
		<BodyWrapper
			style={{
				backgroundImage: `url(../../assets/${
					videoSelected < 0 ? 1 : videoSelected
				})`,
			}}
		>
			{videoSelected >= 0 && (
				<Helmet>
					<title>{videos[videoSelected].name}</title>
				</Helmet>
			)}
			<VideoPlayer videoSelected={videoSelected} videos={videos} />
		</BodyWrapper>
	);
}

export default VideoPlayerView;

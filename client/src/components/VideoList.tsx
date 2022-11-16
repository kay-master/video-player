import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoDataInterface } from "../interfaces/video.interface";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchVideos, selectVideo } from "../store/state/playerSlice";
import { VideoListWrapper } from "../styles/video-list.styled";
import ErrorBoundary from "./ErrorBoundary";
import LazyVideos from "./LazyVideos";

interface Props {
	videos: VideoDataInterface[];
}

export default function VideoList(props: Props) {
	const { videos } = props;

	const { hasNextPage, nextPage, loading } = useAppSelector(
		(state) => state.player
	);

	const { videoTitle } = useParams<{ videoTitle: string }>();
	const dispatch = useAppDispatch();
	const history = useNavigate();

	React.useEffect(() => {
		dispatch(
			fetchVideos({
				pageSize: 4,
				nextPage: 1,
			})
		);
	}, [dispatch]);

	const findIndex = React.useCallback(
		(videoData: VideoDataInterface[], title: string) => {
			const index = videoData.findIndex((video) => {
				return video.name.toLowerCase() === title.toLowerCase();
			});

			return index;
		},
		[]
	);

	React.useEffect(() => {
		if (videoTitle && videos.length > 0) {
			const index = findIndex(videos, videoTitle);

			dispatch(selectVideo(index));
		}
	}, [videoTitle, dispatch, videos, findIndex]);

	function onClick(index: number, title: string) {
		dispatch(selectVideo(index));

		history(`/watch/${title.toLowerCase()}`);
	}

	const loadNextData = async () => {
		if (hasNextPage) {
			dispatch(
				fetchVideos({
					nextPage,
				})
			);
		} else {
			console.log(`Loaded all ${videos.length} videos`);
		}
	};

	return (
		<VideoListWrapper>
			<h1>Up Next</h1>

			<ErrorBoundary>
				{videos.length === 0 && <h3>Fetching videos ...</h3>}
				<LazyVideos
					hasNextPage={hasNextPage}
					isNextPageLoading={loading}
					loadNextPage={loadNextData}
					data={videos}
					onClick={onClick}
				/>
			</ErrorBoundary>
		</VideoListWrapper>
	);
}

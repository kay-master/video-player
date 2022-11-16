import * as React from "react";
import { useParams } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { VideoDataInterface } from "../interfaces/video.interface";
import ErrorBoundary from "./ErrorBoundary";
import VideoThumbnail from "./VideoThumbnail";

interface Props {
	// Are there more items to load?
	// (This information comes from the most recent API request.)
	hasNextPage: boolean;

	// Are we currently loading a page of items?
	// (This may be an in-flight flag in your Redux store for example.)
	isNextPageLoading: boolean;

	// Array of items loaded so far.
	data: VideoDataInterface[];

	// Callback function responsible for loading the next page of items.
	loadNextPage(startIndex: number, stopIndex: number): Promise<void>;

	onClick(index: number, title: string): void;
}

export default function LazyVideo(props: Props) {
	const { hasNextPage, isNextPageLoading, data, onClick, loadNextPage } = props;
	const { videoTitle } = useParams<{ videoTitle: string }>();

	const dataCount = hasNextPage ? data.length + 1 : data.length;

	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

	const isDataLoaded = (index: number) => {
		return !hasNextPage || index < data.length;
	};

	// Render an item or a loading indicator.
	const Item = ({
		index,
		style,
	}: {
		index: number;
		style: React.CSSProperties;
	}) => {
		if (!isDataLoaded(index)) {
			return <>Loading ...</>;
		}

		const video = data[index];
		const isActive =
			videoTitle && video.name.toLowerCase() === videoTitle.toLowerCase()
				? true
				: false;

		return (
			<div style={style}>
				<ErrorBoundary>
					<VideoThumbnail
						key={`${video.name}-${index.toString()}-thumbnail`}
						data={video}
						onClick={() => {
							onClick(index, video.name);
						}}
						src={video.thumbnail}
						isActive={isActive}
					/>
				</ErrorBoundary>
			</div>
		);
	};

	return (
		<InfiniteLoader
			isItemLoaded={isDataLoaded}
			itemCount={dataCount}
			loadMoreItems={loadMoreItems}
			minimumBatchSize={4}
			threshold={1}
		>
			{({ onItemsRendered, ref }) => (
				<List
					className="List"
					height={330}
					itemCount={dataCount}
					itemSize={110}
					onItemsRendered={onItemsRendered}
					ref={ref}
					width="100%"
				>
					{Item}
				</List>
			)}
		</InfiniteLoader>
	);
}

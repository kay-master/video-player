export interface VideoDataInterface {
	name: string;
	path: string;
	thumbnail: string;
	date: string;
	duration: string;
}

export interface VideoPaginate {
	prevPage: number;
	nextPage: number;
	hasNextPage: boolean;
}

export type VideoDataResponse = VideoPaginate & {
	data: VideoDataInterface[];
};

export type PlayerState = VideoPaginate & {
	videoSelected: number;
	videos: VideoDataInterface[];
	loading: boolean;
	hasError: string | null;
};

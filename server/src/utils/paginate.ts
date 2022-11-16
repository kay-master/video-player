import { VideoDataInterface } from "../interfaces/video.interface";

/**
 * Most basic pagination
 */
export function paginate(
	pageSize: number,
	pageNumber: number,
	data: VideoDataInterface[]
) {
	const startIndex = (pageNumber - 1) * pageSize;
	const endIndex = pageNumber * pageSize;
	const results = data.slice(startIndex, endIndex);
	const prevPage = pageNumber > 1 ? pageNumber - 1 : 1;
	const nextPage = pageNumber + 1;

	return {
		prevPage,
		nextPage,
		hasNextPage: endIndex < data.length,
		data: results,
	};
}

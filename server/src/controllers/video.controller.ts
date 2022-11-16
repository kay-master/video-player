import { Request, Response } from "express";
import { VideoDataInterface } from "../interfaces/video.interface";
import { paginate } from "../utils/paginate";
import VIDEO_DATA from "./video-data.json";

const videoData = async (req: Request, res: Response) => {
	try {
		const { pageNumber, pageSize } = req.query;

		let page = 1;
		let limit = 5;

		if (pageNumber) {
			page = Number.parseInt(String(pageNumber));
		}

		if (pageSize) {
			limit = Number.parseInt(String(pageSize));
		}

		// Sort video data via title
		const convertType = VIDEO_DATA as never as { videos: VideoDataInterface[] };

		const sortData = convertType.videos.sort((i, e) => {
			return i.name.localeCompare(e.name);
		});

		const results = paginate(limit, page, sortData);

		return res.status(200).json({
			success: true,
			data: results,
		});
	} catch (error) {
		console.log(error);

		return res.status(400).json({
			success: false,
			error: "Something went wrong, please try again",
		});
	}
};

export default videoData;

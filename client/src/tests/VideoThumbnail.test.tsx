import { render, screen } from "@testing-library/react";
import VideoThumbnail from "../components/VideoThumbnail";

test("renders video thumbnail", () => {
	render(
		<VideoThumbnail
			data={{
				name: "How a Watch Works",
				date: "12 Oct 2021",
				duration: "00:05:12",
				path: "https://fed-dss-challenge-qa.s3.amazonaws.com/assets/vid/1/HowaWatc1949.m3u8",
				thumbnail:
					"https://fed-dss-challenge-qa.s3.amazonaws.com/assets/vid/1/how-a-watch-works-thumb.jpg",
			}}
			onClick={() => {}}
			src="https://fed-dss-challenge-qa.s3.amazonaws.com/assets/vid/1/how-a-watch-works-thumb.jpg"
			isActive
		/>
	);

	expect(screen.getByRole("img")).toBeInTheDocument();

	expect(screen.getByTestId("duration")).toHaveTextContent(
		/^Duration: 00:05:12$/
	);
	expect(screen.getByTestId("date")).toHaveTextContent(/^Added: 12 Oct 2021$/);
});

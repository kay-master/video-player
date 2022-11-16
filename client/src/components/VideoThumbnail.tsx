import { VideoDataInterface } from "../interfaces/video.interface";
import { ThumbnailWrapper } from "../styles/video-list.styled";

interface Props {
	src: string;
	data: VideoDataInterface;
	onClick(): void;
	isActive: boolean;
}

export default function VideoThumbnail(props: Props) {
	const { src, data, onClick, isActive } = props;

	return (
		<ThumbnailWrapper
			onClick={(event) => {
				event.preventDefault();
				onClick();
			}}
			tabIndex={0}
			className={isActive ? "active" : ""}
			href={`/watch/${data.name.toLowerCase()}`}
		>
			<div className="img">
				<img alt="name" src={src} />
			</div>
			<div className="details">
				<div className="title">{data.name}</div>
				<div className="info">
					<div data-testid="duration">Duration: {data.duration}</div>
					<div data-testid="date">Added: {data.date}</div>
				</div>
			</div>
		</ThumbnailWrapper>
	);
}

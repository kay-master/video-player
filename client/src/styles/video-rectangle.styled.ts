import styled from "styled-components";

export const VideoRectWrapper = styled.div`
	flex-grow: 1;
	flex-basis: 0;
	max-width: 100%;
	height: 450px;

	video {
		position: static !important;
		width: 100%;
		height: 100%;
	}

	.video-react {
		.video-react-control-bar {
			background-color: rgba(43, 51, 63, 0.4);
			bottom: 15px;
		}
	}

	@media (max-width: 1090px) {
		margin-bottom: 35px;
	}
`;

export const VideoPlayerContainer = styled.div`
	position: relative;
	height: 100%;

	> div {
		padding-top: 0 !important;
		height: 100% !important;
	}

	.video-react-big-play-button {
		background-color: #3c3b3c;
		width: 2em;
		height: 2em;
		display: flex;
		border-radius: 50%;
		align-items: center;
		border: none;

		&:before {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

export const VideoControls = styled.div`
	position: absolute;
	bottom: 0;
	z-index: 2;
	width: 100%;
	display: flex;
	bottom: 15px;
	align-items: center;
	font-size: 20px;
	height: 50px;
	padding: 0 20px;

	> div {
		padding: 0 20px;
		background-color: rgba(48, 45, 64, 0.55);
		border-radius: 10px;
		width: 100%;
		display: flex;
		align-items: center;
		height: 100%;
		color: #fff;
	}

	.controls-btn {
		display: flex;
		column-gap: 3px;
		height: 35px;
		align-items: center;
		margin-right: 8px;

		button {
			background-color: transparent;
			border: none;
			height: 30px;
			width: 30px;
			justify-content: center;
			display: flex;
			align-items: center;
			font-size: 20px;
			cursor: pointer;
			color: #fff;
			transition: color 0.2s ease-in-out;

			&:hover {
				color: #c5c4c4;
			}

			&:disabled {
				color: #edebeb;
				opacity: 0.5;
				cursor: default;
			}
		}
	}

	.progress-track {
		flex-grow: 1;
		flex-basis: 0;
		max-width: 100%;
	}

	.time {
		font-size: 11px;
		font-family: "Poppins", sans-serif;
		margin-left: 9px;
		width: 118px;
		font-weight: 500;
		padding-right: 5px;
		text-align: center;
	}

	.volume,
	.full-screen {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		cursor: pointer;
	}

	.full-screen {
		font-size: 16px;
	}

	.progress-track {
		background-color: #6a6a6a;
		height: 3px;
		width: 100%;
		border-radius: 2px;

		> div {
			background-color: #fff;
			transition: width 0.2s ease-in-out;
			width: 30%;
			border-radius: 2px;
			height: 100%;
		}
	}
`;

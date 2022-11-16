import styled from "styled-components";

export const VideoListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 370px;
	max-width: 370px;

	> h1 {
		font-size: 17px;
		font-weight: 500;
		margin: 0;
		margin-bottom: 15px;
	}

	@media (max-width: 1090px) {
		max-width: 100%;
		flex: 0 0 100%;
	}
`;

export const ThumbnailWrapper = styled.a`
	display: flex;
	flex-direction: row;
	height: 94px;
	width: 100%;
	border-radius: 13px;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.white};

	&:focus,
	&:hover,
	&.active {
		background-color: ${({ theme }) => theme.colors.lightNavy};
	}

	&:not(:last-child) {
		margin-bottom: 12px;
	}

	.img {
		margin-right: 14px;
		height: 100%;
		width: 140px;

		img {
			height: 100%;
			width: 100%;
			border-radius: 12px;
			object-fit: cover;
		}
	}

	.details {
		flex-grow: 1;
		flex-basis: 0;
		max-width: 100%;

		.title {
			height: 48px;
			font-weight: 400;
			font-size: 16px;
			padding-top: 5px;
		}

		.info {
			font-size: 13px;
			font-weight: 400;
			color: ${({ theme }) => theme.colors.grey};
		}
	}
`;

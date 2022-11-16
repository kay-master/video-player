import styled from "styled-components";

export const VideoPlayerWrapper = styled.div`
	max-width: 1095px;
	margin: 0 auto;
	padding-top: 30px;
	padding-bottom: 70px;

	& > div {
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		column-gap: 25px;
		padding: 0 15px;

		@media (max-width: 1090px) {
			flex-direction: column;
			max-width: 800px;
		}
	}
`;

export const VideoPlayerH1 = styled.h1`
	margin: 0;
	display: flex;
	column-gap: 8px;
	padding: 15px 30px;

	span {
		&:first-child {
			color: ${({ theme }) => theme.colors.red};
		}

		&:last-child {
			color: #22b03a;
		}
	}
`;

export const VideoPlayerPlaceHolder = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.lightNavy};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	font-weight: 300;
`;

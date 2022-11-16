import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
	PlayerState,
	VideoDataResponse,
} from "../../interfaces/video.interface";

const initialState: PlayerState = {
	videoSelected: -1,
	prevPage: 1,
	nextPage: 1,
	hasNextPage: false,
	videos: [],
	loading: true,
	hasError: null,
};

export const fetchVideos = createAsyncThunk(
	"player/videos",
	async (input: { nextPage: number; pageSize?: number }) => {
		try {
			const response = await axios.get(`http://localhost:3001/videos`, {
				params: {
					pageNumber: input.nextPage,
					pageSize: input.pageSize || 5,
				},
			});

			const { data } = response;

			return {
				success: data.success,
				data: data.data as VideoDataResponse,
			};
		} catch (error) {
			return {
				success: false,
				error,
			};
		}
	}
);

const playerSlice = createSlice({
	name: "Player",
	initialState,
	reducers: {
		selectVideo(state, action: PayloadAction<number>) {
			state.videoSelected = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchVideos.pending, (state) => {
			state.loading = true;
			state.hasError = null;
		});
		builder.addCase(fetchVideos.fulfilled, (state, action) => {
			state.loading = false;

			const { data } = action.payload;

			if (data) {
				state.hasNextPage = data.hasNextPage;
				state.nextPage = data.nextPage;
				state.prevPage = data.prevPage;
				state.videos = state.videos.concat(data.data);
				state.hasError = null;
			}
		});
		builder.addCase(fetchVideos.rejected, (state, action) => {
			state.loading = false;
			state.hasError =
				action.error.message || "Something went wrong, please try again";
		});
	},
});

export const { selectVideo } = playerSlice.actions;
export default playerSlice.reducer;

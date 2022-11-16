import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import slicedState from "./state/state";

export const store = configureStore({
  reducer: slicedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

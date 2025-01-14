import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice.ts';
import { AUTH_TOKEN } from '../constant.ts';
import { saveState } from '../helpers.ts';
import clientSlice from "./client.slice.ts";

export const store = configureStore({
  reducer: {
    user: userSlice,
    client: clientSlice
  }
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, AUTH_TOKEN);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

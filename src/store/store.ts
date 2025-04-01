import { configureStore } from '@reduxjs/toolkit';
import globalStateReducer from "./features/GlobalState";
import {storeApi} from "@/store/features/Apislice";

export const store = configureStore({
  reducer: {
    global:globalStateReducer,
    [storeApi.reducerPath]: storeApi.reducer
  },
  middleware:(getDefaultMiddleWare)=> getDefaultMiddleWare().concat(storeApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
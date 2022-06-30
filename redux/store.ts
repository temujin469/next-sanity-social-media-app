import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comment/commentSlice";
import postsReducer from "./post/postSlice";

export const store = configureStore({
  reducer:{commentsReducer,postsReducer}
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
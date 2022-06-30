import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../typings";

interface PostState {
  posts: Post[];
  isFetching: boolean;
  error: boolean;
}

const initialState: PostState = {
  posts: [],
  isFetching: false,
  error: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.isFetching = true;
    },
    fetchPostsSuccess: (state, action) => {
      state.isFetching = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addPostsStart: (state) => {
      state.isFetching = true;
    },
    addPostsSuccess: (state) => {
      state.isFetching = false;
    },
    addPostsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsFailure,
  fetchPostsSuccess,
  addPostsStart,
  addPostsSuccess,
  addPostsFailure,
} = postSlice.actions;
export default postSlice.reducer;

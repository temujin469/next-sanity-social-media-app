import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../typings";

interface CommentState {
  comments: Comment[];
  isFetching: boolean;
  error: boolean;
}

const initialState: CommentState = {
  comments: [],
  isFetching: false,
  error: false,
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    fetchCommentsStart: (state) => {
      state.isFetching = true;
    },
    fetchCommentsSuccess: (state, action) => {
      state.isFetching = false;
      state.comments = {...action.payload,...state.comments,};
    },
    fetchCommentsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addCommentsStart: (state) => {
      state.isFetching = true;
    },
    addCommentsSuccess: (state) => {
      state.isFetching = false;
    },
    addCommentsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsFailure,
  addCommentsStart,
  addCommentsFailure,
  fetchCommentsSuccess,
  addCommentsSuccess
} = commentSlice.actions;
export default commentSlice.reducer;

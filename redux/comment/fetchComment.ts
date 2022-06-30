import axios from "axios";
import { Comment, CommentBody } from "../../typings";
import {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  addCommentsStart,
  addCommentsSuccess,
  addCommentsFailure,
} from "./commentSlice";
import { AppDispatch } from "../store";

export const getComments = async (dispatch: AppDispatch, postId: string) => {
  dispatch(fetchCommentsStart());
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${postId}`
    );
    const comments: Comment[] = data.comments;
    dispatch(fetchCommentsSuccess(comments));
    return comments;
  } catch (err) {
    dispatch(fetchCommentsFailure());
    console.log(err);
  }
};

export const addComment = async (
  dispatch: AppDispatch,
  commentBody: CommentBody
) => {
  dispatch(addCommentsStart());
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
      commentBody
    );
    dispatch(addCommentsSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addCommentsFailure());
  }
};

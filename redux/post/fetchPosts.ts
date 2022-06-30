import axios from "axios"
import { Post, PostBody } from "../../typings";
import { fetchPostsStart,fetchPostsSuccess,fetchPostsFailure, addPostsStart, addPostsSuccess, addPostsFailure } from "./postSlice";
import { AppDispatch } from "../store";


export const getPosts = async (dispatch:AppDispatch) => {
  dispatch(fetchPostsStart())
  try{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
    const posts :Post[] = data.posts
    dispatch(fetchPostsSuccess(posts))
    return posts;
  }
  catch(err){
    dispatch(fetchPostsFailure())
    console.log(err)
  }
}

export const addPost = async (dispatch:AppDispatch,postBody:PostBody) => {
  dispatch(addPostsStart())
  try{
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,postBody)
    dispatch(addPostsSuccess())
  }
  catch(err){
    console.log(err)
    dispatch(addPostsFailure())
  }
}
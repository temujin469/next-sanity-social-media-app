import axios from "axios";
import { Post } from "../typings";

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/posts`);
    const posts: Post[] = data.posts;
    return posts;
  } catch (err) {
    console.log(err);
  }
};

import axios from "axios"
import { Post } from "../typings";


export const getPosts = async () => {
  try{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
    const posts :Post[] = data.posts
    return posts;
  }
  catch(err){
    console.log(err)
  }
}
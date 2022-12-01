import React, { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import PostBox from "./PostBox";
import { Post } from "../typings";
import PostComponent from "./Post";
import toast from "react-hot-toast";
import { getPosts } from "../redux/post/fetchPosts";
import { useAppDispatch } from "../hooks";

interface Props {
  posts?: Post[]
}

function Feed({ posts: postProp }: Props) {
  const [posts, setPosts] = useState<Post[] | undefined>(postProp)
  const dispatch = useAppDispatch()

  const handleRefresh = async () => {
    const refreshToast = toast.loading("дахин ачаалж байна...")
    const fetchedPosts: Post[] | undefined = await getPosts(dispatch);
    toast.success("нийтлэл шинэчлэгдсэн", {
      id: refreshToast
    })

    setPosts(fetchedPosts)
  }

  return (
    <div className="mx-3 md:mx-5 selection:bg-none col-span-11  md:col-span-7 lg:col-span-5 scrollbar-hide max-h-screen overflow-y-auto">

      <div className="p-[22px] flex items-center justify-between">
        <h1 className="text-root text-xl font-bold">Нүүр хуудас</h1>
        <RefreshIcon onClick={handleRefresh} className=" h-8 w-8 cursor-pointer text-root transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      {/*post box */}
      <div>
        <PostBox setPosts={setPosts} />
      </div>

      {/* posts */}
      <div className="my-3 md:my-5 space-y-3 md:space-y-5">
        {posts?.map((post: Post) => (
          <PostComponent key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;

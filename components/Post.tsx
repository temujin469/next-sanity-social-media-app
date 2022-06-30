import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Post } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  DotsHorizontalIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import CommentComponent from "./Comment";
import { addComment, getComments } from "../redux/comment/fetchComment";
import { useAppDispatch, useAppSelector } from "../hooks";
import toast from "react-hot-toast";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input,setInput] = useState<string>('');
  const [commentsBoxVisible, setcommentsBoxVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const refereshComments = async () => {
    const comments:any = await getComments(dispatch,post._id);
    setComments(comments);
  };
  useEffect(() => {
    refereshComments();
  }, []);

  const commentBody:CommentBody = {
    text:input,
    username:session?.user?.name || "Тодорхойгүй",
    profileImage:session?.user?.image || "https://beomy.co.il/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
    post:{
      _ref:post._id,
      _type:"reference"
    }
  };

  const createComment = async () => {
    await addComment(dispatch,commentBody)
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    await createComment();
    await refereshComments()
    setInput('')
    toast('Сэтгэгдэл нэмэгдлээ');
  }

  return (
    <div className="bg-white shadow p-5 rounded-lg">
      <div className="flex flex-col space-x-3">
        {/*post header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={post.profileImage}
              alt="profile-image"
            />

            <div>
              <div className="flex flex-col">
                  <p className="mr-1 font-bold text-harBaraan">
                    {post.username}
                  </p>

                <TimeAgo
                  className="text-sm text-baraan"
                  date={post._createdAt}
                />
              </div>
            </div>
          </div>
          <DotsHorizontalIcon className="w-7 h-7 text-baraan cursor-pointer" />
        </div>

        {/* post body */}
        <div>
          <p className="pt-1">{post.text}</p>

          {post.image && (
            <img
              className="m-5 ml-0 mb-0 max-h-60 object-cover rounded-lg shadow-xl"
              src={post.image}
              alt="post-image"
            />
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <div className="flex hover:bg-saaral hover:text-root p-1 rounded-lg cursor-pointer space-x-2 items-center text-gray-400">
          <ChatAlt2Icon
            className="w-5 h-5"
            onClick={() => setcommentsBoxVisible(!commentsBoxVisible)}
          />
          <p>{comments.length}</p>
        </div>
        <div className="flex hover:bg-saaral hover:text-root p-1 rounded-lg cursor-pointer space-x-3 items-center text-gray-400">
          <SwitchHorizontalIcon className="w-5 h-5" />
        </div>
        <div className="flex hover:bg-saaral hover:text-root p-1 rounded-lg cursor-pointer space-x-3 items-center text-gray-400">
          <HeartIcon className="w-5 h-5" />
        </div>
        <div className="flex hover:bg-saaral hover:text-root p-1 rounded-lg cursor-pointer space-x-3 items-center text-gray-400">
          <UploadIcon className="w-5 h-5" />
        </div>
      </div>

      {/* comment box */}
      {commentsBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-2 items-center">
          <img
            className="h-9 w-9 object-cover rounded-full"
            src={
              session?.user?.image
                ? session?.user?.image
                : "https://beomy.co.il/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
            }
            alt="profile-image"
          />
          <input
            className="rounded-lg outline-none flex-1 bg-saaral p-2"
            type="text"
            value={input}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInput(e.target.value)}
            placeholder="write comment..."
          />
          {/* <button>submit</button> */}
        </form>
      )}

      {commentsBoxVisible && comments?.length > 0 && (
        <div className="my-5 pt-5 scrollbar-hide space-y-5 border-t px-5">
          {comments.map((comment) => (
            <CommentComponent comment={comment} key={comment._id}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;

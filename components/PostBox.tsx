import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { useSession, signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { PostBody, Post } from "../typings";
import { addPost, getPosts } from "../redux/post/fetchPosts";
import ImageBox from "./ImageBox";
import { useAppDispatch, useAppSelector } from "../hooks";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<any | Post[]>>;
}

function PostBox({ setPosts }: Props) {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUrlBoxIsOpen, setimageUrlBoxIsOpen] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch()
  const {postsReducer} = useAppSelector(state=>state)

  const addImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
  };

  const postBody: PostBody = {
    text: input,
    username: session?.user?.name || "Unknown User",
    profileImage:
      session?.user?.image ||
      "https://beomy.co.il/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
    image: image,
    _type: "post",
  };

  const createPost = async () => {
    await addPost(dispatch,postBody);
    const newPosts = await getPosts(dispatch);
    setPosts(newPosts);

    toast("Нийтлэл амжилттай нэмэгдлээ", { icon: "🚀" });

    setInput("");
    setImage("");
    setimageUrlBoxIsOpen(false);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    session ? createPost() : signIn();
  };
  return (
    <div className="bg-white flex space-x-2 p-5 rounded-lg">
      <img
        className="mt-4 w-14 h-14 rounded-full object-cover"
        src={
          session?.user?.image
            ? session.user.image
            : "https://beomy.co.il/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
        }
        alt="user"
      />

      <div className="flex flex-1 items-center">
        <form className="flex flex-1 flex-col">
          <input
            type="text"
            placeholder="Юу тохиолдсон?"
            className="h-24 outline-none w-full placeholder:text-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-root">
              <PhotographIcon
                onClick={() => setimageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              disabled={!input}
              onClick={handleSubmit}
              className="font-bold bg-root rounded-lg px-5 py-2 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >{ postsReducer.isFetching ? "fetching": "Нийтлэх"}

            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <ImageBox
              image={image}
              imageInputRef={imageInputRef}
              addImage={addImage}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default PostBox;

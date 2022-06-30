import React from "react";
import { Comment } from "../typings";
import TimeAgo from "react-timeago";

interface Props {
  comment:Comment
}
function Comment({comment}:Props) {
  return (
    <div key={comment._id} className="flex  space-x-2 relative">
      <hr className="absolute left-5 top-8 h-8 border-x" />
      <img
        className="h-7 w-7 object-cover rounded-full"
        src={comment.profileImage}
        alt="profile-image"
      />
      <div className="bg-saaral p-2 rounded-lg">
        <div className="flex items-center space-x-1">
          <p className="mr-1 font-bold">{comment.username}</p>
          <TimeAgo
            className="text-sm text-gray-500"
            date={comment._createdAt}
          />
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}

export default Comment;

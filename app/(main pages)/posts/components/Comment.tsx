import React from "react";
import Image from "next/image";

interface CommentProps {
  avatar: string;
  name: string;
  time: string;
  text: string;
  upvotes: number;
  downvotes: number;
}

const Comment: React.FC<CommentProps> = ({
  avatar,
  name,
  time,
  text,
  upvotes,
  downvotes,
}) => {
  return (
    <div className="mb-6 flex gap-3">
      <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-blue-800">{name}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="mb-2 text-gray-700">{text}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Image
              src="/icons/vote-up.svg"
              alt="Upvote"
              width={16}
              height={16}
            />
            {upvotes}
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/icons/vote-down.svg"
              alt="Downvote"
              width={16}
              height={16}
            />
            {downvotes}
          </span>
          <span className="flex cursor-pointer items-center gap-1">
            <Image
              src="/icons/delete.svg"
              alt="Delete"
              width={16}
              height={16}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;

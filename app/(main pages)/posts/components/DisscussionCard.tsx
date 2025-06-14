import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface DisscussionCardProps {
  id: string;
  title: string;
  description: string;
  avatarUrl: string;
  upvotes: number;
  downvotes: number;
  comments: number;
}

export default function DisscussionCard({
  id,
  title,
  description,
  avatarUrl,
  upvotes,
  downvotes,
  comments,
}: DisscussionCardProps) {
  const router = useRouter();

  return (
    <div
      className="bg-primary-light hover:bg-primary/10 flex w-full cursor-pointer flex-col gap-4 rounded-2xl p-5 shadow transition hover:shadow-lg"
      onClick={() => router.push(`/posts/${id}`)}
      tabIndex={0}
      role="button"
      aria-label={`View discussion: ${title}`}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="line-clamp-2 text-xs text-gray-400">{description}</p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Avatar className="h-7 w-7">
          <AvatarImage src={avatarUrl} alt="User Avatar" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <img src="/icons/vote-up.svg" alt="Upvote" className="h-4 w-4" />
            <span>{upvotes}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <img
              src="/icons/vote-down.svg"
              alt="Downvote"
              className="h-4 w-4"
            />
            <span>{downvotes}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <img src="/icons/comments.svg" alt="Comments" className="h-4 w-4" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

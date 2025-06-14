"use client";
import React from "react";
import Image from "next/image";
import Comment from "./Comment";
import DisscussionCard from "./DisscussionCard";
import { useRouter } from "next/navigation";

const mockComments = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Billy Green",
    time: "20min ago",
    text: "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
    upvotes: 20,
    downvotes: 2,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    name: "Billy Green",
    time: "20min ago",
    text: "Awesome Edward, remeber that five tips for low cost",
    upvotes: 10,
    downvotes: 1,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    name: "Billy Green",
    time: "20min ago",
    text: "Awesome Edward, remeber that five tips for low cost",
    upvotes: 10,
    downvotes: 1,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Sarah Smith",
    time: "18min ago",
    text: "Thanks for sharing these tips, they are really helpful!",
    upvotes: 15,
    downvotes: 0,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    name: "Edward King",
    time: "15min ago",
    text: "I have a few more suggestions for low cost holidays if anyone is interested.",
    upvotes: 8,
    downvotes: 0,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    name: "Linda Brown",
    time: "12min ago",
    text: "Can you elaborate more on the third tip?",
    upvotes: 5,
    downvotes: 1,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    name: "James Lee",
    time: "10min ago",
    text: "I tried these tips last year and saved a lot!",
    upvotes: 12,
    downvotes: 0,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    name: "Emily Clark",
    time: "8min ago",
    text: "Great discussion, everyone!",
    upvotes: 7,
    downvotes: 0,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    name: "Michael Scott",
    time: "5min ago",
    text: "Looking forward to more tips like these.",
    upvotes: 9,
    downvotes: 2,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    name: "Olivia Turner",
    time: "2min ago",
    text: "Thanks for the advice!",
    upvotes: 4,
    downvotes: 0,
  },
];

export default function DiscussionsForm() {
  const router = useRouter();
  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex-1 text-center text-lg font-medium text-gray-500">
          Discussion
        </h2>
        <button
          className="absolute top-4 right-4 text-xl font-bold text-red-400 hover:text-red-600"
          onClick={() => {
            router.back();
          }}
        >
          &times;
        </button>
      </div>

      {/* Actions */}
      <div className="mb-4 flex items-center gap-2">
        <span className="font-medium text-gray-600">Actions:</span>
        <button className="flex cursor-pointer items-center gap-1 rounded bg-red-100 px-4 py-1 text-red-700 hover:bg-red-200">
          <Image src="/icons/delete.svg" alt="Delete" width={18} height={18} />{" "}
          Delete
        </button>
      </div>

      {/* Discussion Card */}
      <div className="mb-6">
        <DisscussionCard
          id="1"
          title="Meeting with customer"
          description="First, a disclaimer – the entire process writing a blog post often
          takes a couple of hours if you can type"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          upvotes={20}
          downvotes={6}
          comments={mockComments.length}
        />
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="mb-2 text-lg font-bold">
          Comments ({mockComments.length})
        </h3>
        <div className="max-h-80 overflow-y-auto pr-2">
          {mockComments.map((comment, idx) => (
            <Comment key={idx} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

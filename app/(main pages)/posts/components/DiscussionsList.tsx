"use client";
import React from "react";
import { ActionBar } from "./ActionBar";
import DisscussionCard from "./DisscussionCard";

const mockDiscussions = [
  {
    id: "1",
    title: "Meeting with customer",
    description:
      "First, a disclaimer – the entire process writing a blog post often takes a couple...",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    upvotes: 20,
    downvotes: 6,
    comments: 8,
  },
  {
    id: "2",
    title: "Project Kickoff",
    description:
      "We discussed the initial requirements and set the project milestones for Q2.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    upvotes: 15,
    downvotes: 2,
    comments: 5,
  },
  {
    id: "3",
    title: "Design Review",
    description:
      "Reviewed the new UI mockups and provided feedback to the design team.",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    upvotes: 12,
    downvotes: 1,
    comments: 3,
  },
  {
    id: "4",
    title: "Sprint Retrospective",
    description:
      "Team shared thoughts on what went well and what could be improved for next sprint.",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    upvotes: 18,
    downvotes: 3,
    comments: 7,
  },
  {
    id: "5",
    title: "Tech Talk: React 18",
    description:
      "Explored new features in React 18 and how they impact our current stack.",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    upvotes: 25,
    downvotes: 0,
    comments: 10,
  },
];

export default function DiscussionsList() {
  return (
    <div className="flex flex-col gap-4">
      <ActionBar onSearch={() => {}} />
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockDiscussions.map((discussion, idx) => (
          <DisscussionCard key={discussion.id} {...discussion} />
        ))}
      </div>
    </div>
  );
}

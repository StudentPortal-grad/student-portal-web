"use client";
import React from "react";
import CommunitiesCard from "./CommunitiesCard";
import { ActionBar } from "./ActionBar";

const mockCommunities = [
  {
    id: "1",
    title: "University Community",
    createdAt: "Nov 10, 2022",
    icon: "/icons/checked-circle.svg",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "Official",
    userCount: 1548,
  },
  {
    id: "2",
    title: "Tech Enthusiasts",
    createdAt: "Jan 5, 2023",
    icon: "/icons/checked-circle.svg",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Official",
    userCount: 980,
  },
  {
    id: "3",
    title: "Art Lovers",
    createdAt: "Mar 12, 2023",
    icon: "/icons/checked-circle.svg",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "Official",
    userCount: 430,
  },
  {
    id: "4",
    title: "Sports Club",
    createdAt: "Feb 20, 2023",
    icon: "/icons/checked-circle.svg",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    status: "Official",
    userCount: 1200,
  },
];

export default function CommunitiesList() {
  return (
    <div className="flex flex-col gap-4">
      <ActionBar onSearch={() => {}} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCommunities.map((community, idx) => (
          <CommunitiesCard key={community.id} {...community} />
        ))}
      </div>
    </div>
  );
}

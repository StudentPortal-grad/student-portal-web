import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import Link from "next/link";

interface CommunitiesCardProps {
  id: string;
  title: string;
  createdAt: string;
  icon: string;
  avatar: string;
  status: string;
  userCount: number;
}

export default function CommunitiesCard({
  id,
  title,
  createdAt,
  icon,
  avatar,
  status,
  userCount,
}: CommunitiesCardProps) {
  return (
    <div className="bg-primary-light flex flex-col gap-4 rounded-2xl p-6 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-1 text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-400">Created at: {createdAt}</p>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={icon} alt="Community Icon" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-black-10 ml-1 rounded-full p-1 focus:outline-none">
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/communities/edit/${id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/communities/delete/${id}`}
                  className="text-red-600"
                >
                  Delete
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Avatar className="h-7 w-7 border-2 border-white shadow">
          <AvatarImage src={avatar} alt="User Avatar" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <span className="bg-black-100 mr-1 inline-block h-2 w-2 rounded-full"></span>
          <span className="font-medium text-[#8A8CD9]">{status}</span>
        </span>
      </div>

      <div className="bg-black-10 h-[1px] w-full"></div>

      <div className="mx-auto mt-2">
        <span className="text-base font-semibold text-gray-900">
          {userCount}
        </span>
        <span className="ml-1 text-sm text-gray-400">Total Users</span>
      </div>
    </div>
  );
}

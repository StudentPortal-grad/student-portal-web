"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import TooltipWrapper from "@/components/TooltipWrapper";
import Link from "next/link";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  registrationDate: string;
  avatarUrl?: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
    maxSize: 32,
  },
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => <span>#{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const avatarUrl = row.original.avatarUrl;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={row.original.name} />
            <AvatarFallback>{row.original.name[0]}</AvatarFallback>
          </Avatar>
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "registrationDate",
    header: "Registration Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image src="/icons/date.svg" alt="date" width={16} height={16} />
        <span className="text-black-100 text-sm font-medium">
          {row.original.registrationDate}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-5">
        <TooltipWrapper content="View">
          <Link href={`/users/view/${row.original.id}`}>
            <Image
              src="/icons/view.svg"
              alt="view"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </Link>
        </TooltipWrapper>
        <TooltipWrapper content="Edit">
          <Link href={`/users/edit/${row.original.id}`}>
            <Image
              src="/icons/edit.svg"
              alt="edit"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </Link>
        </TooltipWrapper>
        <TooltipWrapper content="Delete">
          <Link href={`/users/delete/${row.original.id}`}>
            <Image
              src="/icons/delete.svg"
              alt="delete"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </Link>
        </TooltipWrapper>
      </div>
    ),
  },
];

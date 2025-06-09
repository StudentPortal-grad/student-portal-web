import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import TooltipWrapper from "@/components/TooltipWrapper";
import Link from "next/link";

export type Event = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  status: string;
  visibility: string;
  rsvp: string;
  avatarUrl?: string;
};

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const avatarUrl = row.original.avatarUrl;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={row.original.title} />
            <AvatarFallback>{row.original.title[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{row.original.title}</span>
            {row.original.location && (
              <span className="text-xs text-gray-400">
                {row.original.location}
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date/Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image src="/icons/date.svg" alt="date" width={16} height={16} />
        <span className="text-black-100 text-sm font-medium">
          {row.original.date} <br /> {row.original.time}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
  },
  {
    accessorKey: "rsvp",
    header: "RSVP Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-5">
        <TooltipWrapper content="Edit">
          <Link href={`/events/edit/${row.original.id}`}>
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
          <Link href={`/events/delete/${row.original.id}`}>
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

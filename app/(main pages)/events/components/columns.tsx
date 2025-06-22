import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import TooltipWrapper from "@/components/TooltipWrapper";
import Link from "next/link";

export type Event = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  eventImage: string;
  visibility: string;
  attendees: any[];
  creatorId: {
    _id: string;
    name: string;
    profilePicture: string;
    followersCount: number;
    followingCount: number;
    id: string;
  };
  status: string;
  recommendations: any[];
  createdAt: string;
  updatedAt: string;
  rsvps: Array<{
    userId: {
      _id: string;
      name: string;
      profilePicture: string;
      followersCount: number;
      followingCount: number;
      id: string;
    };
    status: string;
    updatedAt: string;
    _id: string;
  }>;
  __v: number;
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
      const eventImage = row.original.eventImage;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={eventImage} alt={row.original.title} />
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
    accessorKey: "startDate",
    header: "Date/Time",
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate);
      const endDate = new Date(row.original.endDate);
      const formattedStartDate = startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedStartTime = startDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedEndTime = endDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div className="flex items-center gap-2">
          <Image src="/icons/date.svg" alt="date" width={16} height={16} />
          <span className="text-black-100 text-sm font-medium">
            {formattedStartDate} <br /> {formattedStartTime} -{" "}
            {formattedEndTime}
          </span>
        </div>
      );
    },
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
    accessorKey: "rsvps",
    header: "RSVP Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-black-100 text-sm font-medium">
          {row.original.rsvps.length}
        </span>
        <Image src="/icons/users.svg" alt="rsvp" width={16} height={16} />
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-5">
        <TooltipWrapper content="Edit">
          <Link href={`/events/edit/${row.original._id}`}>
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
          <Link href={`/events/delete/${row.original._id}`}>
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

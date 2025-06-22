import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import TooltipWrapper from "@/components/TooltipWrapper";
import Link from "next/link";
import moment from "moment";

export type Resource = {
  id: string;
  fileName: string;
  title: string;
  visibility: string;
  category: string;
  uploadTime: string;
  fileUrl?: string;
  originalFileName: string;
  uploader: {
    name: string;
  };
  createdAt: string;
};

export const columns: ColumnDef<Resource>[] = [
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
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image src="/icons/pdf.svg" alt="pdf" width={32} height={32} />
        <div className="flex flex-col">
          <span className="text-black-100 text-sm font-medium">
            {row.original.originalFileName}
          </span>
          <span className="text-black-60 text-xs font-medium">
            {row.original.title}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.visibility}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.category}</span>
    ),
  },
  {
    accessorKey: "uploader",
    header: "Uploader",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image src="/icons/user.svg" alt="user" width={16} height={16} />
        <span>{row.original.uploader.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "uploadTime",
    header: "Upload Time",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return (
        <div className="flex items-center gap-2">
          <Image src="/icons/date.svg" alt="date" width={16} height={16} />
          <span className="text-black-100 text-sm font-medium">
            {formattedDate}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-5">
        <TooltipWrapper content="Download">
          <a href={row.original.fileUrl || "#"} download target="_blank">
            <Image
              src="/icons/download.svg"
              alt="download"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </a>
        </TooltipWrapper>
        <TooltipWrapper content="Edit">
          <Link href={`/resources/edit/${row.original.id}`}>
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
          <Link href={`/resources/delete/${row.original.id}`}>
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

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import TooltipWrapper from "@/components/TooltipWrapper";
import Link from "next/link";

export type Resource = {
  id: string;
  fileName: string;
  visibility: string;
  category: string;
  uploader: string;
  uploadTime: string;
  fileUrl?: string;
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
        <span>{row.original.fileName}</span>
      </div>
    ),
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "uploader",
    header: "Uploader",
  },
  {
    accessorKey: "uploadTime",
    header: "Upload Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image src="/icons/date.svg" alt="date" width={16} height={16} />
        <span className="text-black-100 text-sm font-medium">
          {row.original.uploadTime}
        </span>
      </div>
    ),
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

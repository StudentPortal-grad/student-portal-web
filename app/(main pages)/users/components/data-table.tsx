"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  RowSelectionState,
  OnChangeFn,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onPageChange?: (page: number) => void;
  numPages: number;
  currentPage?: number;
  getRowId?: (row: TData, index: number) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowSelection = {},
  onRowSelectionChange,
  onPageChange,
  numPages,
  currentPage = 1,
  getRowId,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    manualPagination: true,
    pageCount: numPages,
    autoResetPageIndex: false,
    getRowId: getRowId || ((row, index) => index.toString()),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b-2 border-gray-200"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="mt-2 flex items-center justify-end gap-1 px-6 py-3">
        <button
          className="hover:bg-black-5 flex h-6 w-6 items-center justify-center rounded-full disabled:opacity-50"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          style={{ fontSize: "0.85rem" }}
        >
          <ChevronLeft
            className="h-4 w-4 cursor-pointer"
            style={{ color: "var(--color-black-40)" }}
          />
        </button>

        {(() => {
          const pages = [];
          const maxVisiblePages = 7;

          if (numPages <= maxVisiblePages) {
            for (let i = 1; i <= numPages; i++) {
              pages.push(i);
            }
          } else {
            if (currentPage <= 4) {
              for (let i = 1; i <= 5; i++) {
                pages.push(i);
              }
              pages.push("...");
              pages.push(numPages);
            } else if (currentPage >= numPages - 3) {
              // Near end: show first + ellipsis + last 5
              pages.push(1);
              pages.push("...");
              for (let i = numPages - 4; i <= numPages; i++) {
                pages.push(i);
              }
            } else {
              pages.push(1);
              pages.push("...");
              for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pages.push(i);
              }
              pages.push("...");
              pages.push(numPages);
            }
          }

          return pages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-6 w-6 items-center justify-center text-xs text-gray-500"
                >
                  ...
                </span>
              );
            }

            const isCurrent = currentPage === page;
            return (
              <button
                key={page}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition select-none ${isCurrent ? "" : "hover:bg-black-5"} cursor-pointer`}
                onClick={() => onPageChange?.(page as number)}
                aria-current={isCurrent ? "page" : undefined}
                style={{
                  color: isCurrent
                    ? "var(--color-black-100)"
                    : "var(--color-black-40)",
                  background: "transparent",
                  fontWeight: isCurrent ? 700 : 500,
                }}
              >
                {page}
              </button>
            );
          });
        })()}

        <button
          className="hover:bg-black-5 flex h-6 w-6 items-center justify-center rounded-full disabled:opacity-50"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= numPages}
          aria-label="Next page"
          style={{ fontSize: "0.85rem" }}
        >
          <ChevronRight
            className="h-4 w-4 cursor-pointer"
            style={{ color: "var(--color-black-40)" }}
          />
        </button>
      </div>
    </div>
  );
}

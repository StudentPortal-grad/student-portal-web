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
  getPaginationRowModel,
  getFilteredRowModel,
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
  globalFilter?: string;
  onPageChange?: (page: number) => void;
  numPages: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowSelection = {},
  onRowSelectionChange,
  globalFilter = "",
  onPageChange,
  numPages,
}: DataTableProps<TData, TValue>) {
  const [pageSize] = React.useState(10);
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onRowSelectionChange,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        setPageIndex(newState.pageIndex);
        onPageChange?.(newState.pageIndex + 1);
      } else {
        setPageIndex(updater.pageIndex);
        onPageChange?.(updater.pageIndex + 1);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    pageCount: numPages,
    // Disable automatic page reset on selection
    autoResetPageIndex: false,
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
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
          style={{ fontSize: "0.85rem" }}
        >
          <ChevronLeft
            className="h-4 w-4 cursor-pointer"
            style={{ color: "var(--color-black-40)" }}
          />
        </button>
        {Array.from({ length: table.getPageCount() }, (_, i) => {
          const isCurrent = table.getState().pagination.pageIndex === i;
          return (
            <button
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition select-none ${isCurrent ? "" : "hover:bg-black-5"} cursor-pointer`}
              onClick={() => table.setPageIndex(i)}
              aria-current={isCurrent ? "page" : undefined}
              style={{
                color: isCurrent
                  ? "var(--color-black-100)"
                  : "var(--color-black-40)",
                background: "transparent",
                fontWeight: isCurrent ? 700 : 500,
              }}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          className="hover:bg-black-5 flex h-6 w-6 items-center justify-center rounded-full disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
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

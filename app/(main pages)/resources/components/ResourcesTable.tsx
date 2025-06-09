"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns, Resource } from "./columns";
import { ActionBar } from "./ActionBar";
import { RowSelectionState } from "@tanstack/react-table";
import FilterBar from "./FilterBar";
import Link from "next/link";
import Image from "next/image";

export default function ResourcesTable() {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState("");

  const mockResources: Resource[] = [
    {
      id: "RES1",
      fileName: "Project tech requirements.pdf",
      visibility: "Public",
      category: "Documents",
      uploader: "Karina Clark",
      uploadTime: "Just now",
      fileUrl: "/files/project-tech-requirements.pdf",
    },
    {
      id: "RES2",
      fileName: "Completed Project Stylings.pdf",
      visibility: "Public",
      category: "Programming",
      uploader: "Roth Bloom",
      uploadTime: "Yesterday",
      fileUrl: "/files/completed-project-stylings.pdf",
    },
    {
      id: "RES3",
      fileName: "Project tech requirements.pdf",
      visibility: "Public",
      category: "Programming",
      uploader: "Karina Clark",
      uploadTime: "Feb 2, 2023",
      fileUrl: "/files/project-tech-requirements.pdf",
    },
    {
      id: "RES4",
      fileName: "Completed Project Stylings.pdf",
      visibility: "Private",
      category: "Programming",
      uploader: "Roth Bloom",
      uploadTime: "Feb 5, 2023",
      fileUrl: "/files/completed-project-stylings.pdf",
    },
  ];

  function pageChange(page: number) {
    console.log("Page changed to:", page);
  }

  useEffect(() => {
    const selectedResourceIds = Object.keys(selectedRows);
    const selectedResources = mockResources.filter((_, index) =>
      selectedResourceIds.includes(index.toString()),
    );
    console.log("Selected Resources:", selectedResources);
  }, [selectedRows]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <FilterBar />
        <Link
          href="/resources/new"
          className="bg-primary-blue-base flex items-center gap-1 rounded-[8px] px-4 py-3"
        >
          <Image
            src="/icons/plus.svg"
            alt="New Resource"
            width={18}
            height={18}
          />
          <span className="text-sm font-medium text-white">New Resource</span>
        </Link>
      </div>
      <ActionBar
        selectedCount={Object.keys(selectedRows).length}
        onSearch={setSearchQuery}
        onDelete={() => {
          // Handle delete action here
          console.log("Delete selected resources:", Object.keys(selectedRows));
        }}
      />
      <DataTable
        columns={columns}
        data={mockResources}
        rowSelection={selectedRows}
        onRowSelectionChange={setSelectedRows}
        globalFilter={searchQuery}
        onPageChange={pageChange}
        numPages={1}
      />
    </>
  );
}

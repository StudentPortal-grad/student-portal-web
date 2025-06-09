"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns, Event } from "./columns";
import { ActionBar } from "./ActionBar";
import { RowSelectionState } from "@tanstack/react-table";

export default function EventsTable() {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState("");

  const mockEvents: Event[] = [
    {
      id: "EVT2025",
      title: "Graduation Ceremony 2025",
      location: "Main Auditorium",
      date: "June 15, 2025",
      time: "10:00 AM",
      status: "Upcoming",
      visibility: "Public",
      rsvp: "250 Attending",
      avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      id: "EVT2026",
      title: "Lana Steiner",
      location: "",
      date: "June 15, 2025",
      time: "10:00 AM",
      status: "Upcoming",
      visibility: "Public",
      rsvp: "250 Attending",
      avatarUrl: "https://randomuser.me/api/portraits/women/11.jpg",
    },
    {
      id: "EVT2027",
      title: "Natali Craig",
      location: "",
      date: "June 15, 2025",
      time: "10:00 AM",
      status: "Ended",
      visibility: "Public",
      rsvp: "250 Attending",
      avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  function pageChange(page: number) {
    console.log("Page changed to:", page);
  }

  useEffect(() => {
    const selectedEventIds = Object.keys(selectedRows);
    const selectedEvents = mockEvents.filter((_, index) =>
      selectedEventIds.includes(index.toString()),
    );
    console.log("Selected Events:", selectedEvents);
  }, [selectedRows]);

  return (
    <>
      <ActionBar
        selectedCount={Object.keys(selectedRows).length}
        onSearch={setSearchQuery}
        onDelete={() => {
          // Handle delete action here
          console.log("Delete selected events:", Object.keys(selectedRows));
        }}
      />
      <DataTable
        columns={columns}
        data={mockEvents}
        rowSelection={selectedRows}
        onRowSelectionChange={setSelectedRows}
        globalFilter={searchQuery}
        onPageChange={pageChange}
        numPages={1}
      />
    </>
  );
}

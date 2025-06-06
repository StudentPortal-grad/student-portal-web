import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";
import { ActionBar } from "./ActionBar";
import { RowSelectionState } from "@tanstack/react-table";

export default function UsersTable() {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState("");

  const mockUsers: User[] = [
    {
      id: "CM9801",
      name: "Kate Morrison",
      email: "test@test.com",
      role: "Admin",
      registrationDate: "Just now",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "CM9841",
      name: "Kate Morrison",
      email: "test@test.com",
      role: "Admin",
      registrationDate: "Just now",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "CM9802",
      name: "Koray Okumus",
      email: "test@test.com",
      role: "Student",
      registrationDate: "A minute ago",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "CM9803",
      name: "Lana Steiner",
      email: "test@test.com",
      role: "Student",
      registrationDate: "1 hour ago",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "CM9804",
      name: "Natali Craig",
      email: "test@test.com",
      role: "Student",
      registrationDate: "Yesterday",
      avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "CM9804",
      name: "Orlando Diggs",
      email: "test@test.com",
      role: "Student",
      registrationDate: "Yesterday",
      avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: "CM9801",
      name: "Kate Morrison",
      email: "test@test.com",
      role: "Student",
      registrationDate: "Feb 2, 2023",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "CM9802",
      name: "Koray Okumus",
      email: "test@test.com",
      role: "Student",
      registrationDate: "Feb 3, 2023",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "CM9803",
      name: "Lana Steiner",
      email: "test@test.com",
      role: "Student",
      registrationDate: "Feb 4, 2023",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "CM9804",
      name: "Natali Craig",
      email: "test@test.com",
      role: "Student",
      registrationDate: "Feb 5, 2023",
      avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "CM9805",
      name: "Orlando Diggs",
      email: "test@test.com",
      role: "Admin",
      registrationDate: "Feb 6, 2023",
      avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  function pageChange(page: number) {
    console.log("Page changed to:", page);
  }

  // Log selected users whenever selection changes
  useEffect(() => {
    const selectedUserIds = Object.keys(selectedRows);
    const selectedUsers = mockUsers.filter((_, index) =>
      selectedUserIds.includes(index.toString()),
    );
    console.log("Selected Users:", selectedUsers);
  }, [selectedRows]);

  return (
    <>
      <ActionBar
        selectedCount={Object.keys(selectedRows).length}
        onSearch={setSearchQuery}
        onDelete={() => {
          // Handle delete action here
          console.log("Delete selected users:", Object.keys(selectedRows));
        }}
      />
      <DataTable
        columns={columns}
        data={mockUsers}
        rowSelection={selectedRows}
        onRowSelectionChange={setSelectedRows}
        globalFilter={searchQuery}
        onPageChange={pageChange}
        numPages={10}
      />
    </>
  );
}

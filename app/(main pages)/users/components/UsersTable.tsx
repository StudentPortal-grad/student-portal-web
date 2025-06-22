"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";
import { ActionBar } from "./ActionBar";
import { RowSelectionState } from "@tanstack/react-table";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/messages/Loading";
import ErrorMessage from "@/components/messages/ErrorMessage";

export default function UsersTable({
  session,
  baseUrl,
}: {
  session: Session | null;
  baseUrl: string;
}) {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [deleteTrigger, setDeleteTrigger] = useState(0);

  function pageChange(page: number) {
    setPage(page);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    setPage(1);
  }

  function BulkDelete() {
    const selectedUserIds = Object.keys(selectedRows);

    if (selectedUserIds.length === 0) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUserIds.length} selected user(s)? This action cannot be undone.`,
    );

    if (!confirmDelete) {
      return;
    }

    const deleteUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/users/bulk/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            userIds: selectedUserIds,
          }),
        });

        const data = await response.json();

        if (data.message === "Invalid token") {
          router.push("/api/auth/logout");
          return;
        }

        if (!data.success) {
          throw new Error(data.message || "Failed to delete users.");
        }

        setSelectedRows({});
        setDeleteTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Error deleting users:", error);
        setError(
          error instanceof Error ? error.message : "Failed to delete users",
        );
      } finally {
        setIsLoading(false);
      }
    };

    deleteUsers();
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${baseUrl}/users?page=${page}&limit=10&sortBy=createdAt&sortOrder=${sortOrder}&search=${debouncedSearchQuery}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.token}`,
            },
          },
        );

        const data = await response.json();

        if (data.message === "Invalid token") {
          router.push("/api/auth/logout");
          return;
        }

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch users.");
        }

        setUsers(data.data || []);
        setTotalPages(data.metadata?.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch users",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [
    page,
    debouncedSearchQuery,
    baseUrl,
    session?.token,
    router,
    sortOrder,
    deleteTrigger,
  ]);

  useEffect(() => {
    const selectedUserIds = Object.keys(selectedRows);
    const selectedUsers = users.filter((user) =>
      selectedUserIds.includes(user.id),
    );
  }, [selectedRows, users]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <ActionBar
        selectedCount={Object.keys(selectedRows).length}
        onSearch={handleSearch}
        onDelete={BulkDelete}
        onSort={setSortOrder}
        sortOrder={sortOrder}
      />
      {isLoading ? (
        <Loading
          message="Loading users..."
          description="Please wait while we fetch the data"
        />
      ) : (
        <DataTable
          columns={columns}
          data={users}
          rowSelection={selectedRows}
          onRowSelectionChange={setSelectedRows}
          onPageChange={pageChange}
          numPages={totalPages}
          currentPage={page}
          getRowId={(row) => row.id}
        />
      )}
    </>
  );
}

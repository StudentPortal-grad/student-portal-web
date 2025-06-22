"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns, Event } from "./columns";
import { ActionBar } from "./ActionBar";
import { RowSelectionState } from "@tanstack/react-table";
import { Session } from "next-auth";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/messages/Loading";
import ErrorMessage from "@/components/messages/ErrorMessage";

export default function EventsTable({
  session,
  baseUrl,
}: {
  session: Session | null;
  baseUrl: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);

  useEffect(() => {
    const refetch = searchParams.get("refetch");
    if (refetch === "true") {
      setDeleteTrigger((prev) => prev + 1);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("refetch");
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, router]);

  function pageChange(page: number) {
    setPage(page);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    setPage(1);
  }

  function BulkDelete() {
    const selectedEventIds = Object.keys(selectedRows);

    if (selectedEventIds.length === 0) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedEventIds.length} selected event(s)? This action cannot be undone.`,
    );

    if (!confirmDelete) {
      return;
    }

    const BulkDeleteEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/events/bulk`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            eventIds: selectedEventIds,
          }),
        });

        const data = await response.json();

        if (data.message === "Invalid token") {
          router.push("/api/auth/logout");
          return;
        }

        if (!data.success) {
          throw new Error(data.message || "Failed to delete events.");
        }

        setSelectedRows({});
        setDeleteTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Error deleting events:", error);
        setError(
          error instanceof Error ? error.message : "Failed to delete events",
        );
      } finally {
        setIsLoading(false);
      }
    };

    BulkDeleteEvents();
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/events`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
        });

        const data = await response.json();

        if (data.message === "Invalid token") {
          redirect("/api/auth/logout");
        }

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch events.");
        }

        setEvents(data.data || []);
        setTotalPages(data.metadata?.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch events",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [baseUrl, session?.token, router, deleteTrigger]);

  useEffect(() => {
    const selectedEventIds = Object.keys(selectedRows);
    const selectedEvents = events.filter((event) =>
      selectedEventIds.includes(event._id),
    );
  }, [selectedRows, events]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <ActionBar
        selectedCount={Object.keys(selectedRows).length}
        onSearch={handleSearch}
        onDelete={BulkDelete}
      />
      {isLoading ? (
        <Loading
          message="Loading events..."
          description="Please wait while we fetch the data"
        />
      ) : (
        <DataTable
          columns={columns}
          data={events}
          rowSelection={selectedRows}
          onRowSelectionChange={setSelectedRows}
          onPageChange={pageChange}
          numPages={totalPages}
          currentPage={page}
          getRowId={(row) => row._id}
        />
      )}
    </>
  );
}

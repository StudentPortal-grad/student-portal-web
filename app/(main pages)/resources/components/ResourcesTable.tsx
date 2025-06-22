"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns, Resource } from "./columns";
import { ActionBar } from "./ActionBar";
import { RowSelectionState } from "@tanstack/react-table";
import FilterBar from "./FilterBar";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/messages/Loading";
import ErrorMessage from "@/components/messages/ErrorMessage";

export default function ResourcesTable({
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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [deleteTrigger, setDeleteTrigger] = useState(0);
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [debouncedTagFilter, setDebouncedTagFilter] = useState<string[]>([]);

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

  function handleVisibilityFilter(visibility: string) {
    setVisibilityFilter(visibility);
    setPage(1);
  }

  function handleCategoryFilter(category: string) {
    setCategoryFilter(category);
    setPage(1);
  }

  function handleTagFilter(tags: string[]) {
    setTagFilter(tags);
    setPage(1);
  }

  function BulkDelete() {
    const selectedResourceIds = Object.keys(selectedRows);

    if (selectedResourceIds.length === 0) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedResourceIds.length} selected resource(s)? This action cannot be undone.`,
    );

    if (!confirmDelete) {
      return;
    }

    const deleteResources = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/resources/bulk`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            resourceIds: selectedResourceIds,
          }),
        });

        const data = await response.json();

        if (data.message === "Invalid token") {
          router.push("/api/auth/logout");
          return;
        }

        if (!data.success) {
          throw new Error(data.message || "Failed to delete resources.");
        }

        setSelectedRows({});
        setDeleteTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("❌ Error deleting resources:", error);
        setError(
          error instanceof Error ? error.message : "Failed to delete resources",
        );
      } finally {
        setIsLoading(false);
      }
    };

    deleteResources();
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTagFilter(tagFilter);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [tagFilter]);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10",
          sortBy: "createdAt",
          sortOrder: sortOrder,
          search: debouncedSearchQuery,
        });

        if (visibilityFilter !== "all") {
          params.append("visibility", visibilityFilter);
        }

        if (categoryFilter !== "all") {
          params.append("category", categoryFilter);
        }

        if (debouncedTagFilter.length > 0) {
          debouncedTagFilter.forEach((tag) => params.append("tags[]", tag));
        }

        const response = await fetch(
          `${baseUrl}/resources?${params.toString()}`,
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
          throw new Error(data.message || "Failed to fetch resources.");
        }

        const resourcesData = data.data.resources;

        const mappedResources = resourcesData.map((resource: any) => ({
          ...resource,
          id: resource._id,
        }));
        setResources(mappedResources);
        setTotalPages(data.data.pagination?.pages || 1);
        setCategories(data.data.categories || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch resources",
        );
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [
    page,
    debouncedSearchQuery,
    baseUrl,
    session?.token,
    router,
    sortOrder,
    deleteTrigger,
    visibilityFilter,
    categoryFilter,
    debouncedTagFilter,
  ]);

  useEffect(() => {
    const selectedResourceIds = Object.keys(selectedRows);
    if (Array.isArray(resources)) {
      const selectedResources = resources.filter((resource) =>
        selectedResourceIds.includes(resource.id),
      );
    }
  }, [selectedRows, resources]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <FilterBar
          categories={categories || []}
          onVisibilityFilter={handleVisibilityFilter}
          onCategoryFilter={handleCategoryFilter}
          onTagFilter={handleTagFilter}
          visibilityFilter={visibilityFilter}
          categoryFilter={categoryFilter}
        />
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
        onSearch={handleSearch}
        onDelete={BulkDelete}
        onSort={setSortOrder}
        sortOrder={sortOrder}
      />
      {isLoading ? (
        <Loading
          message="Loading resources..."
          description="Please wait while we fetch the data"
        />
      ) : (
        <DataTable
          columns={columns}
          data={Array.isArray(resources) ? resources : []}
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

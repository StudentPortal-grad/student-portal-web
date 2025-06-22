"use client";
import React, { useEffect, useState } from "react";
import CommunitiesCard from "./CommunitiesCard";
import { ActionBar } from "./ActionBar";
import { Session } from "next-auth";
import Loading from "@/components/messages/Loading";
import ErrorMessage from "@/components/messages/ErrorMessage";

export default function CommunitiesList({
  session,
  baseUrl,
}: {
  session: Session;
  baseUrl: string;
}) {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = new URL(`${baseUrl}/communities`);
        if (debouncedSearch) {
          url.searchParams.append("search", debouncedSearch);
        }
        const response = await fetch(url.toString(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCommunities(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch communities.");
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, [session, baseUrl, debouncedSearch]);

  return (
    <div className="flex flex-col gap-4">
      <ActionBar onSearch={setSearch} />
      {loading && (
        <Loading
          message="Loading communities..."
          description="Please wait while we fetch the communities."
        />
      )}
      {error && <ErrorMessage message={error} />}
      {communities.length > 0 && !error ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community, idx) => (
            <CommunitiesCard key={community.id} {...community} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="my-5 flex h-full items-center justify-center">
            <p className="text-sm text-gray-500">No communities found.</p>
          </div>
        )
      )}
    </div>
  );
}

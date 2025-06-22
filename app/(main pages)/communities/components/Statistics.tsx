"use client";
import { Session } from "next-auth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "@/components/messages/Loading";
import ErrorMessage from "@/components/messages/ErrorMessage";

export default function Statistics({
  session,
  baseUrl,
}: {
  session: Session;
  baseUrl: string;
}) {
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/communities/metrics`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setStatistics(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch statistics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, [session, baseUrl]);

  if (loading) {
    return (
      <Loading
        message="Loading statistics..."
        description="Please wait while we fetch the statistics."
      />
    );
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  const {
    totalCommunities = 0,
    officialCommunities = 0,
    userCommunities = 0,
  } = statistics?.data || {};

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-primary-blue flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-semibold">Official Communities</p>
          <Image
            src="/icons/checked-circle.svg"
            alt="users"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">
          {Number(officialCommunities).toLocaleString()}
        </p>
      </div>

      <div className="bg-primary-purple flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-semibold">User Communities</p>
          <Image
            src="/icons/user-switch.svg"
            alt="user-switch"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">
          {Number(userCommunities).toLocaleString()}
        </p>
      </div>

      <div className="bg-primary-blue flex flex-col gap-4 rounded-2xl p-6">
        <div className="text-black-100 flex w-full items-center justify-between">
          <p className="text-sm font-semibold">All Communities</p>
          <Image
            src="/icons/communities.svg"
            alt="communities"
            width={24}
            height={24}
          />
        </div>
        <p className="text-2xl font-bold">
          {Number(totalCommunities).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

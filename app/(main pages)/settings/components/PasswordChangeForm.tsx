"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/messages/ErrorMessage";
import SuccessMessage from "@/components/messages/SuccessMessage";
import { redirect } from "next/navigation";

export default function PasswordChangeForm({
  session,
  baseUrl,
}: {
  session: any;
  baseUrl: string;
}) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<any[]>([]);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/users/me/password`, {
        method: "POST",
        body: JSON.stringify({ currentPassword: password, newPassword }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        if (data.error.details) {
          setError(data.error.details);
        } else {
          setError([{ message: data.message }]);
        }
        return;
      }

      setSuccess("Password changed successfully");
      setError([]);
      setTimeout(() => {
        redirect("/api/auth/logout");
      }, 2000);
    } catch (error: any) {
      setError([{ message: error.message }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex w-fit flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Enter your current password"
            className="h-9 bg-white sm:h-10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <Input
            id="password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Enter your new password"
            className="h-9 bg-white sm:h-10"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !password || !newPassword}
          className="text-black-brand cursor-pointer rounded-lg bg-white px-4 py-2 transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "changing password..." : "Change Password"}
        </button>
      </form>

      <div className="w-fit">
        {error &&
          error.map((error: any, index: number) => (
            <ErrorMessage key={index} message={error.message} />
          ))}
        {success && <SuccessMessage message={success} />}
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/messages/ErrorMessage";
import SuccessMessage from "@/components/messages/SuccessMessage";
import Loading from "@/components/messages/Loading";

export type UserFormMode = "view" | "edit";

// API Response User Type
export type ApiUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  level: number;
  status: string;
  createdAt: string;
  following: string[];
  username: string;
  followersCount: number;
  followingCount: number;
  id: string;
  isFollowed: boolean;
  isBlocked: boolean;
  profile: {
    interests: string[];
  };
};

export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  level: number;
  status: string;
  profilePicture: string;
  interests: string[];
};

interface UserFormProps {
  mode: UserFormMode;
  user?: UserFormData;
  userId?: string;
  session: Session | null;
  baseUrl: string;
}

export const transformApiUserToFormData = (apiUser: ApiUser): UserFormData => {
  const nameParts = apiUser.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    firstName,
    lastName,
    email: apiUser.email,
    username: apiUser.username,
    role: apiUser.role,
    level: apiUser.level,
    status: apiUser.status,
    profilePicture: apiUser.profilePicture,
    interests: apiUser.profile?.interests || [],
  };
};

export const transformFormDataToApiUser = (
  formData: UserFormData,
): Partial<ApiUser> => {
  return {
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    username: formData.username,
    role: formData.role,
    level: formData.level,
    status: formData.status,
    profilePicture: formData.profilePicture,
    profile: {
      interests: formData.interests,
    },
  };
};

export default function UserForm({
  mode,
  user: initialUser,
  userId,
  session,
  baseUrl,
}: UserFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserFormData | null>(initialUser || null);
  const [form, setForm] = useState<UserFormData | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(!initialUser && !!userId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || initialUser) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
        });

        const data = await response.json();

        if (data.message === "Invalid token") {
          router.push("/api/auth/logout");
          return;
        }

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch user data");
        }

        const userData = transformApiUserToFormData(data.data.user);
        setUser(userData);
        setForm(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch user data",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, initialUser, baseUrl, session?.token, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!userId) {
        throw new Error("User ID is required for update operation");
      }

      const apiData = transformFormDataToApiUser(form);

      const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (data.message === "Invalid token") {
        router.push("/api/auth/logout");
        return;
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to update user");
      }

      setSuccess("User updated successfully");

      setTimeout(() => {
        router.push("/users?refetch=true");
      }, 1500);
    } catch (error) {
      console.error("Error updating user:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update user",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const getSafeImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return "/icons/user.svg";

    try {
      const url = new URL(imageUrl);
      if (url.hostname === "randomuser.me") {
        return imageUrl;
      }
    } catch {}

    return "/icons/user.svg";
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <Loading
          message="Loading user data..."
          description="Please wait while we fetch the user information."
        />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <ErrorMessage message={error} />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <Loading
          message="Updating user..."
          description="Please wait while we save your changes."
        />
      </div>
    );
  }

  if (!user || !form) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <ErrorMessage message="No user data available" />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg"
    >
      <h2 className="mb-4 text-center text-lg font-medium">
        {mode === "edit" ? "Edit User" : "View User"}
      </h2>

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}

      <div className="mb-6 flex flex-col items-center">
        <Image
          src={getSafeImageUrl(user.profilePicture)}
          alt="User Avatar"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          disabled={mode === "view"}
          placeholder="First Name"
          className="rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50 disabled:text-gray-600"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          disabled={mode === "view"}
          placeholder="Last Name"
          className="rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50 disabled:text-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={mode === "view"}
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50 disabled:text-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          disabled={mode === "view"}
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50 disabled:text-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Level</label>
        <input
          type="number"
          name="level"
          value={form.level}
          onChange={handleChange}
          disabled={mode === "view"}
          min="1"
          max="10"
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50 disabled:text-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          disabled={mode === "view"}
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50 disabled:text-gray-600"
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="away">Away</option>
          <option value="busy">Busy</option>
        </select>
      </div>
      <div className="mb-8">
        <label className="mb-1 block text-xs text-gray-400">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          disabled={mode === "view"}
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50 disabled:text-gray-600"
        >
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="faculty">Faculty</option>
          <option value="superadmin">Super Admin</option>
          <option value="researcher">Researcher</option>
        </select>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 hover:bg-gray-200"
        >
          {mode === "view" ? "Back" : "Cancel"}
        </button>
        {mode === "edit" && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-black px-6 py-2 text-base font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        )}
      </div>
    </form>
  );
}

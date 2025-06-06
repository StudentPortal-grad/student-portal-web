"use client";
import React, { useState } from "react";
import Image from "next/image";

export type UserFormMode = "view" | "edit";
export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  role: string;
  avatarUrl?: string;
};

interface UserFormProps {
  mode: UserFormMode;
  user: UserFormData;
  onSave?: (data: UserFormData) => void;
  onCancel: () => void;
}

export default function UserForm({
  mode,
  user,
  onSave,
  onCancel,
}: UserFormProps) {
  const [form, setForm] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg"
    >
      <h2 className="mb-4 text-center text-lg font-medium">
        {mode === "edit" ? "Edit User" : "View User"}
      </h2>
      <div className="mb-6 flex flex-col items-center">
        <Image
          src={user.avatarUrl || "/icons/avatar-placeholder.svg"}
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
          className="rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          disabled={mode === "view"}
          placeholder="Last Name"
          className="rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
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
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">
          Date of Birth
        </label>
        <input
          type="text"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          disabled={mode === "view"}
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
        />
      </div>
      <div className="mb-8">
        <label className="mb-1 block text-xs text-gray-400">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          disabled={mode === "view"}
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
        >
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
        </select>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 hover:bg-gray-200"
        >
          Cancel
        </button>
        {mode === "edit" && (
          <button
            type="submit"
            className="rounded-md bg-black px-6 py-2 text-base font-medium text-white hover:bg-gray-900"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
}

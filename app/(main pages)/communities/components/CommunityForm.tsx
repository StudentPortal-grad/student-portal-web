"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

export type CommunityFormMode = "new" | "edit";
export type CommunityFormData = {
  name: string;
  description: string;
  type: string;
  visibility: string;
  icon?: File | null;
};

interface CommunityFormProps {
  mode: CommunityFormMode;
  community?: CommunityFormData;
  onSave?: (data: CommunityFormData) => void;
  onCancel: () => void;
}

export default function CommunityForm({
  mode,
  community,
  onSave,
  onCancel,
}: CommunityFormProps) {
  const [form, setForm] = useState<CommunityFormData>(
    community || {
      name: "",
      description: "",
      type: "Official",
      visibility: "Public",
      icon: null,
    },
  );
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, icon: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setIconPreview(url);
    } else {
      setIconPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    setForm((prev) => ({ ...prev, icon: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setIconPreview(url);
    } else {
      setIconPreview(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg"
    >
      <h2 className="mb-4 text-center text-lg font-medium">
        {mode === "edit" ? "Edit Community" : "Create Community"}
      </h2>
      <div className="mb-6 flex items-center gap-4">
        <label
          className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-200 bg-gray-50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {iconPreview ? (
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={iconPreview}
                alt="icon preview"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <Image
              src="/icons/upload.svg"
              alt="upload"
              width={40}
              height={40}
            />
          )}
          <input
            type="file"
            name="icon"
            className="inset-0 hidden h-full w-full cursor-pointer opacity-0"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
          />
        </label>
        <button
          type="button"
          className="cursor-pointer rounded border bg-gray-50 px-4 py-2 text-sm text-gray-500"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Icon
        </button>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">
          Community Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Community Name"
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter event description"
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
          rows={3}
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-gray-400">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
          >
            <option value="Official">Official</option>
            <option value="Unofficial">Unofficial</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs text-gray-400">Visibility</label>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-100 px-6 py-2 text-base font-medium text-gray-800 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-black px-6 py-2 text-base font-medium text-white hover:bg-gray-900"
        >
          {mode === "edit" ? "Save" : "Create Community"}
        </button>
      </div>
    </form>
  );
}

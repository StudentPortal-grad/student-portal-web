"use client";
import React, { useState } from "react";
import Image from "next/image";

export type ResourceFormMode = "new" | "edit";
export type ResourceFormData = {
  title: string;
  description: string;
  tags: string;
  category: string;
  visibility: string;
  file?: File | null;
};

interface ResourceFormProps {
  mode: ResourceFormMode;
  resource?: ResourceFormData;
  onSave?: (data: ResourceFormData) => void;
  onCancel: () => void;
}

export default function ResourceForm({
  mode,
  resource,
  onSave,
  onCancel,
}: ResourceFormProps) {
  const [form, setForm] = useState<ResourceFormData>(
    resource || {
      title: "",
      description: "",
      tags: "",
      category: "",
      visibility: "Public",
      file: null,
    },
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

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
    setForm((prev) => ({ ...prev, file }));
    if (file) {
      setUploading(true);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploading(false);
        }
      }, 100);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    setForm((prev) => ({ ...prev, file }));
    if (file) {
      setUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploading(false);
        }
      }, 100);
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
        {mode === "edit" ? "Edit Resource" : "Upload New Resource"}
      </h2>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">
          Resource Title
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter resource title"
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter resource description"
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">Tags</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Enter tags separated by commas"
          className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-gray-400">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-md border bg-white px-4 py-3 text-base disabled:bg-gray-50"
          >
            <option value="">Select Category</option>
            <option value="Documents">Documents</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
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
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">
          Resource File
        </label>
        <label
          className="relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-200 bg-gray-50 py-8 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Image src="/icons/upload.svg" alt="upload" width={32} height={32} />
          <p className="mt-2 text-sm text-gray-400">
            Drop files here or click to upload
          </p>
          <input
            type="file"
            name="file"
            className="inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={handleFileChange}
          />
        </label>
        {form.file && (
          <div className="mt-2 text-sm text-gray-600">{form.file.name}</div>
        )}
        {uploading && (
          <div className="mt-4 w-full rounded bg-blue-50 px-4 py-2">
            <div className="mb-1 text-xs text-gray-500">Uploading...</div>
            <div className="h-2 w-full rounded bg-blue-100">
              <div
                className="h-2 rounded bg-blue-500"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
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
          {mode === "edit" ? "Save" : "Upload Resource"}
        </button>
      </div>
    </form>
  );
}

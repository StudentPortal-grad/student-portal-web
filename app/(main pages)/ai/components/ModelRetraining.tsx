"use client";

import { Session } from "next-auth";
import Image from "next/image";
import React, { useRef, useState } from "react";
import SuccessMessage from "@/components/messages/SuccessMessage";
import ErrorMessage from "@/components/messages/ErrorMessage";

const fileIcons: Record<string, string> = {
  pdf: "/icons/pdf.svg",
  docx: "/icons/word.svg",
  txt: "/icons/txt.svg",
  md: "/icons/md.svg",
  default: "/icons/file.svg",
};

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return fileIcons[ext || ""] || fileIcons.default;
}

function formatSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ModelRetraining({
  session,
  baseUrl,
  modelApiKey,
}: {
  session: Session;
  baseUrl: string;
  modelApiKey: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log("Selected file:", file);
    setSelectedFile(file);
    setMessage(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("rebuild", "true");

      const response = await fetch(`${baseUrl}/admin/upload-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "api-key": modelApiKey,
          Authorization: `Bearer ${session.user.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage({
        type: "success",
        text: "File uploaded successfully! Model retraining has started.",
      });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        type: "error",
        text: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-secondary-purple-e flex w-full flex-col items-center justify-center gap-6 rounded-lg px-12 py-16"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-1 text-center text-2xl font-semibold">Retrain</h2>
      <Image
        src="/icons/upload.svg"
        alt="retrain"
        width={60}
        height={60}
        className="mb-2"
      />
      <p className="mb-2 text-center text-gray-500">
        Allowed file types: docx, txt, pdf, md.
      </p>
      <input
        type="file"
        accept=".docx,.txt,.pdf,.md"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        id="model-upload-input"
      />
      <button
        type="button"
        className="mb-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-gray-700 hover:bg-gray-100"
        onClick={() => fileInputRef.current?.click()}
      >
        Choose Files
      </button>
      {selectedFile && (
        <div className="flex items-center gap-3 rounded-md bg-white px-3 py-2 shadow-sm">
          <Image
            src={getFileIcon(selectedFile.name)}
            alt="file"
            width={28}
            height={28}
          />
          <div className="flex-1">
            <div className="truncate font-medium">{selectedFile.name}</div>
            <div className="text-xs text-gray-400">
              {formatSize(selectedFile.size)}
            </div>
          </div>
          <button
            type="button"
            className="ml-2 px-2 text-lg font-bold text-gray-400 hover:text-red-500"
            onClick={handleRemoveFile}
            aria-label="Remove file"
          >
            ×
          </button>
        </div>
      )}
      <button
        className="mt-2 rounded-lg bg-black px-10 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!selectedFile || isLoading}
        type="submit"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Uploading...
          </div>
        ) : (
          "Retrain"
        )}
      </button>
      {message && (
        <div className="mt-2">
          {message.type === "success" ? (
            <SuccessMessage message={message.text} />
          ) : (
            <ErrorMessage message={message.text} />
          )}
        </div>
      )}
    </form>
  );
}

"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

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

export default function ModelRetraining() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Selected files:", e.target.files);
    setSelectedFiles(e.target.files);
  };

  const handleRemoveFile = (idx: number) => {
    if (!selectedFiles) return;
    const filesArr = Array.from(selectedFiles);
    filesArr.splice(idx, 1);
    // Create a new FileList
    const dataTransfer = new DataTransfer();
    filesArr.forEach((file) => dataTransfer.items.add(file));
    setSelectedFiles(dataTransfer.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) return;
    // TODO: Implement file upload logic here
    alert(`Uploading ${selectedFiles.length} file(s).`);
  };

  const filesArray = selectedFiles ? Array.from(selectedFiles) : [];

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
        multiple
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
      {filesArray.length > 0 && (
        <ul className="mb-2 flex w-full flex-col gap-2 text-sm text-gray-700">
          {filesArray.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-md bg-white px-3 py-2 shadow-sm"
            >
              <Image
                src={getFileIcon(file.name)}
                alt="file"
                width={28}
                height={28}
              />
              <div className="flex-1">
                <div className="truncate font-medium">{file.name}</div>
                <div className="text-xs text-gray-400">
                  {formatSize(file.size)}
                </div>
              </div>
              <button
                type="button"
                className="ml-2 px-2 text-lg font-bold text-gray-400 hover:text-red-500"
                onClick={() => handleRemoveFile(idx)}
                aria-label="Remove file"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-2 rounded-lg bg-black px-10 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        disabled={filesArray.length === 0}
        type="submit"
      >
        Retrain
      </button>
    </form>
  );
}

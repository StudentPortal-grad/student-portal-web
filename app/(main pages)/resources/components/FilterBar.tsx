import React, { useState } from "react";

interface FilterBarProps {
  onVisibilityFilter: (visibility: string) => void;
  onCategoryFilter: (category: string) => void;
  onTagFilter: (tags: string[]) => void;
  visibilityFilter: string;
  categoryFilter: string;
  categories: string[];
}

export default function FilterBar({
  onVisibilityFilter,
  onCategoryFilter,
  onTagFilter,
  visibilityFilter,
  categoryFilter,
  categories,
}: FilterBarProps) {
  const [tagInput, setTagInput] = useState("");

  const handleTagChange = (value: string) => {
    setTagInput(value);

    // Convert comma-separated string to array of trimmed words
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onTagFilter(tags);
  };

  return (
    <div className="flex w-full max-w-[600px] gap-4 rounded-xl bg-white p-4">
      <div className="flex flex-1 flex-col">
        <label className="text-black-80 mb-1 text-xs">Category</label>
        <select
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none"
          value={categoryFilter}
          onChange={(e) => onCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-1 flex-col">
        <label className="text-black-80 mb-1 text-xs">Tags</label>
        <input
          type="text"
          placeholder="Search tags (comma separated)..."
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none"
          value={tagInput}
          onChange={(e) => handleTagChange(e.target.value)}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <label className="text-black-80 mb-1 text-xs">Visibility</label>
        <select
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none"
          value={visibilityFilter}
          onChange={(e) => onVisibilityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
    </div>
  );
}

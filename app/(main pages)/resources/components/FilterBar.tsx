import React from "react";

export default function FilterBar() {
  return (
    <div className="flex w-full max-w-[600px] gap-4 rounded-xl bg-white p-4">
      <div className="flex flex-1 flex-col">
        <label className="text-black-80 mb-1 text-xs">Category</label>
        <select className="rounded-md border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none">
          <option>All Categories</option>
          <option>Documents</option>
          <option>Programming</option>
          <option>Design</option>
        </select>
      </div>
      <div className="flex flex-1 flex-col">
        <label className="text-black-80 mb-1 text-xs">Tags</label>
        <input
          type="text"
          placeholder="Search tags..."
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <label className="text-black-80 mb-1 text-xs">Visibility</label>
        <select className="rounded-md border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none">
          <option>All</option>
          <option>Public</option>
          <option>Private</option>
        </select>
      </div>
    </div>
  );
}

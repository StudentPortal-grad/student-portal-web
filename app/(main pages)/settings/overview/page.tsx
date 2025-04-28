import React from "react";
import Tabs from "../components/Tabs";

export default function page() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="bg-primary-light rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <ProfileDetails />
        </div>
      </div>
    </div>
  );
}

function ProfileDetails() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-semibold">Profile Details</h1>
      <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            disabled
            value="John"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            disabled
            value="Doe"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            disabled
            value="john.doe@example.com"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Rule</label>
          <input
            type="text"
            disabled
            value="Admin"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Contact Phone
          </label>
          <input
            type="tel"
            disabled
            value="+1 (555) 123-4567"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="text-black-brand cursor-pointer rounded-lg bg-white px-4 py-2 transition-all duration-200 hover:shadow-md"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

import React from "react";
import Tabs from "../components/Tabs";
import Image from "next/image";

// Mock data for login sessions
const mockLoginSessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "New York, USA",
    ipAddress: "192.168.1.1",
    lastActive: "2024-03-20 14:30:00",
    status: "Active",
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "London, UK",
    ipAddress: "192.168.1.2",
    lastActive: "2024-03-19 09:15:00",
    status: "Inactive",
  },
  {
    id: 3,
    device: "Firefox on Mac",
    location: "Tokyo, Japan",
    ipAddress: "192.168.1.3",
    lastActive: "2024-03-18 22:45:00",
    status: "Inactive",
  },
];

export default function page() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="bg-primary-light rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Logs />
        </div>
      </div>
    </div>
  );
}

function Logs() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-semibold">Login Sessions</h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-[20%] px-4 py-3 text-left text-sm font-medium text-gray-600">
                Device
              </th>
              <th className="w-[20%] px-4 py-3 text-left text-sm font-medium text-gray-600">
                Location
              </th>
              <th className="w-[20%] px-4 py-3 text-left text-sm font-medium text-gray-600">
                IP Address
              </th>
              <th className="w-[20%] px-4 py-3 text-left text-sm font-medium text-gray-600">
                Last Active
              </th>
              <th className="w-[10%] px-4 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="w-[10%] px-4 py-3 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockLoginSessions.map((session) => (
              <tr
                key={session.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="w-[20%] px-4 py-3 text-sm text-gray-900">
                  {session.device}
                </td>
                <td className="w-[20%] px-4 py-3 text-sm text-gray-900">
                  {session.location}
                </td>
                <td className="w-[20%] px-4 py-3 text-sm text-gray-900">
                  {session.ipAddress}
                </td>
                <td className="w-[20%] px-4 py-3 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/clock.svg"
                      alt="clock"
                      width={16}
                      height={16}
                    />
                    <span>{session.lastActive}</span>
                  </div>
                </td>
                <td className="w-[10%] px-4 py-3 text-sm">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      session.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
                <td className="w-[10%] px-4 py-3 text-sm">
                  <button className="group cursor-pointer text-sm font-medium hover:text-red-600">
                    <CloseSessionIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CloseSessionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      className="transition-colors group-hover:fill-red-600"
    >
      <path
        d="M14.875 3.375H1.125C0.779822 3.375 0.5 3.65482 0.5 4C0.5 4.34518 0.779822 4.625 1.125 4.625H14.875C15.2202 4.625 15.5 4.34518 15.5 4C15.5 3.65482 15.2202 3.375 14.875 3.375Z"
        fill="currentColor"
      />
      <path
        d="M5.5 7.75V12.75C5.5 13.0952 5.77982 13.375 6.125 13.375C6.47018 13.375 6.75 13.0952 6.75 12.75V7.75C6.75 7.40482 6.47018 7.125 6.125 7.125C5.77982 7.125 5.5 7.40482 5.5 7.75Z"
        fill="currentColor"
      />
      <path
        d="M9.25 7.75V12.75C9.25 13.0952 9.52982 13.375 9.875 13.375C10.2202 13.375 10.5 13.0952 10.5 12.75V7.75C10.5 7.40482 10.2202 7.125 9.875 7.125C9.52982 7.125 9.25 7.40482 9.25 7.75Z"
        fill="currentColor"
      />
      <path
        d="M3 15.875V4C3 3.65482 2.72018 3.375 2.375 3.375C2.02982 3.375 1.75 3.65482 1.75 4V15.875C1.75 16.3928 2.11612 16.7589 2.11612 16.7589C2.48223 17.125 3 17.125 3 17.125H13C13.5178 17.125 13.8839 16.7589 13.8839 16.7589C14.25 16.3928 14.25 15.875 14.25 15.875V4C14.25 3.65482 13.9702 3.375 13.625 3.375C13.2798 3.375 13 3.65482 13 4V15.875H3Z"
        fill="currentColor"
      />
      <path
        d="M4.79918 1.42417C4.25 1.97335 4.25 2.75 4.25 2.75V4C4.25 4.34518 4.52982 4.625 4.875 4.625C5.22018 4.625 5.5 4.34518 5.5 4V2.75C5.5 2.49112 5.68306 2.30806 5.68306 2.30806C5.86612 2.125 6.125 2.125 6.125 2.125H9.875C10.1339 2.125 10.3169 2.30806 10.3169 2.30806C10.5 2.49112 10.5 2.75 10.5 2.75V4C10.5 4.34518 10.7798 4.625 11.125 4.625C11.4702 4.625 11.75 4.34518 11.75 4V2.75C11.75 1.97335 11.2008 1.42417 11.2008 1.42417C10.6517 0.875 9.875 0.875 9.875 0.875H6.125C5.34835 0.875 4.79918 1.42417 4.79918 1.42417Z"
        fill="currentColor"
      />
    </svg>
  );
}

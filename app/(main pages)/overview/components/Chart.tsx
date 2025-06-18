"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

// Accepts the raw API response as the data prop
export default function Chart({
  data,
}: {
  data: {
    period: string;
    userHistory: { roles: string[]; totalCount: number; date: string }[];
  };
}) {
  // Get current year and month
  const now = moment();
  const year = now.year();
  const month = now.month(); // 0-indexed
  const daysInMonth = now.daysInMonth();

  // Map userHistory to a Map of day -> totalCount
  const chartMap = new Map<number, number>();
  if (data?.userHistory) {
    data.userHistory.forEach((entry) => {
      const entryDate = moment(entry.date);
      if (entryDate.year() === year && entryDate.month() === month) {
        chartMap.set(entryDate.date(), entry.totalCount);
      }
    });
  }

  // Build chart data for all days in the current month
  const chartData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return {
      name: day.toString().padStart(2, "0"),
      value: chartMap.get(day) || 0,
    };
  });

  return (
    <div className="bg-primary-light rounded-2xl p-6">
      <div className="mb-4 ml-4 text-lg font-semibold">Total Users</div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ececec" vertical={true} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: "#888" }}
            axisLine={true}
            tickLine={true}
            tickMargin={12}
          />
          <YAxis
            tickFormatter={(v) => v}
            tick={{ fontSize: 14, fill: "#b0b0b0" }}
            axisLine={true}
            tickLine={true}
            tickMargin={12}
          />
          <Tooltip formatter={(v) => v.toLocaleString()} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#111"
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

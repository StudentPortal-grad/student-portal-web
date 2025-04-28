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

const data = [
  { name: "", uv: null, pv: null },
  { name: "Mon", uv: 1000000, pv: 1500000 },
  { name: "Tue", uv: 1200000, pv: 2000000 },
  { name: "Wed", uv: 1800000, pv: 1200000 },
  { name: "Thu", uv: 1400000, pv: 3500000 },
  { name: "Fri", uv: 2000000, pv: 5000000 },
  { name: "Sat", uv: 3000000, pv: 4000000 },
  { name: "Sun", uv: 4000000, pv: 6000000 },
  { name: "Mon", uv: 5000000, pv: 7000000 },
  { name: "Tue", uv: 7000000, pv: 9000000 },
  { name: "Wed", uv: 8000000, pv: 8500000 },
  { name: "Thu", uv: 9000000, pv: 9500000 },
  { name: "Fri", uv: 11000000, pv: 8000000 },
];

export default function Chart() {
  return (
    <div className="bg-primary-light rounded-2xl p-6">
      <div className="mb-4 ml-4 text-lg font-semibold">Total Users</div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ececec" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v / 1000000}M`}
            tick={{ fontSize: 14, fill: "#b0b0b0" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 16000000]}
          />
          <Tooltip formatter={(v) => v.toLocaleString()} />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#b6c6d7"
            strokeWidth={4}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#111"
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

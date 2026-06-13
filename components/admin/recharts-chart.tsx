"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  time: string;
  temperature: number;
  humidity: number;
}

export function WeatherChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#c1c8c7" />
          <XAxis
            dataKey="time"
            stroke="#717978"
            fontSize={12}
            tickLine={false}
          />
          <YAxis stroke="#717978" fontSize={12} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#783b21"
            strokeWidth={2}
            dot={{ r: 3, fill: "#783b21" }}
            name="Temperature °C"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#315250"
            strokeWidth={2}
            dot={{ r: 3, fill: "#315250" }}
            name="Humidity %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

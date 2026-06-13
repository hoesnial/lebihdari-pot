"use client";

import dynamic from "next/dynamic";

const RechartsChart = dynamic(
  () => import("./recharts-chart").then((m) => ({ default: m.WeatherChart })),
  { ssr: false },
);

interface ChartData {
  time: string;
  temperature: number;
  humidity: number;
}

export function WeatherChart({ data }: { data: ChartData[] }) {
  if (data.length < 2) return null;
  return <RechartsChart data={data} />;
}

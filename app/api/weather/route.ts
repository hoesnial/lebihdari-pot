import { syncWeatherData } from "@/lib/services/weather";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await syncWeatherData();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to sync weather data" },
      { status: 500 },
    );
  }
}

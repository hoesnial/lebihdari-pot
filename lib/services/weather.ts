import { prisma } from "@/lib/prisma";

const API_KEY = process.env.OPENWEATHERMAP_API_KEY || "";
const CITY = "Bandung";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export async function fetchCurrentWeather(): Promise<WeatherResponse | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${CITY}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export function generateRecommendation(
  temp: number,
  humidity: number,
  condition: string,
): string {
  if (temp > 35) {
    return "Suhu sangat panas. Pindahkan tanaman ke tempat teduh dan tingkatkan penyiraman.";
  }
  if (temp < 18) {
    return "Suhu dingin. Lindungi tanaman dari angin malam dan kurangi penyiraman.";
  }
  if (humidity < 40) {
    return "Udara kering. Semprot daun dengan air dan gunakan pelembab udara di sekitar tanaman.";
  }
  if (humidity > 85) {
    return "Kelembaban tinggi. Waspada jamur — pastikan sirkulasi udara yang baik.";
  }
  if (condition.includes("Rain") || condition.includes("Drizzle")) {
    return "Hujan turun. Tunda penyiraman dan pastikan drainase pot berfungsi baik.";
  }
  return "Kondisi optimal untuk perawatan tanaman. Pertahankan rutinitas perawatan Anda.";
}

export async function syncWeatherData() {
  const data = await fetchCurrentWeather();
  if (!data) return;

  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const condition = data.weather[0]?.description ?? "unknown";

  await prisma.weatherData.create({
    data: {
      temperature: temp,
      humidity,
      condition,
      windSpeed: Math.round(data.wind.speed),
    },
  });

  const message = generateRecommendation(temp, humidity, condition);

  await prisma.recommendation.create({
    data: { message },
  });
}

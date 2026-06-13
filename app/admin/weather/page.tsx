import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { syncWeatherData } from "@/lib/services/weather";
import { WeatherChart } from "@/components/admin/weather-chart";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Weather Intelligence",
};

function severityConfig(
  severity: string,
): { bg: string; text: string; border: string } {
  switch (severity) {
    case "high":
      return { bg: "bg-error-container", text: "text-on-error-container", border: "border-error" };
    case "medium":
      return {
        bg: "bg-tertiary-container/20",
        text: "text-tertiary",
        border: "border-tertiary",
      };
    default:
      return {
        bg: "bg-secondary-container/30",
        text: "text-secondary",
        border: "border-secondary",
      };
  }
}

function getSeverity(
  temp: number,
  humidity: number,
): { level: "low" | "medium" | "high"; label: string } {
  if (temp > 35)
    return { level: "high", label: "Suhu sangat panas — pindahkan tanaman ke tempat teduh" };
  if (temp < 18)
    return { level: "high", label: "Suhu terlalu dingin — lindungi tanaman dari angin malam" };
  if (humidity < 40)
    return { level: "medium", label: "Udara kering — semprot daun dengan air" };
  if (humidity > 85)
    return { level: "high", label: "Kelembaban tinggi — waspada jamur" };
  return { level: "low", label: "Kondisi optimal untuk perawatan tanaman" };
}

export default async function AdminWeather(props: { searchParams?: Promise<{ refresh?: string }> }) {
  if (props.searchParams) {
    const params = await props.searchParams;
    if (params.refresh === "1") {
      await syncWeatherData();
      redirect("/admin/weather");
    }
  }
  const weatherData = await prisma.weatherData.findMany({
    orderBy: { recordedAt: "asc" },
    take: 24,
  });

  const latest = weatherData[weatherData.length - 1];
  const recommendations = await prisma.recommendation.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const chartData = weatherData.map((w) => ({
    time: w.recordedAt.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: w.temperature,
    humidity: w.humidity,
  }));

  const activeAlerts = weatherData
    .map((w) => ({ ...w, ...getSeverity(w.temperature, w.humidity) }))
    .filter((w) => w.level !== "low")
    .slice(-3);

  const metrics = [
    {
      label: "Temperature",
      value: latest ? `${latest.temperature}°C` : "--",
      icon: "🌡",
      status: latest && latest.temperature > 30 ? "high" : latest && latest.temperature > 25 ? "medium" : "low",
      subtitle: latest && latest.temperature > 30 ? "HOT" : "STABLE",
    },
    {
      label: "Humidity",
      value: latest ? `${latest.humidity}%` : "--",
      icon: "💧",
      status: latest && latest.humidity > 80 ? "high" : latest && latest.humidity < 40 ? "medium" : "low",
      subtitle: latest && latest.humidity > 80 ? "WET" : latest && latest.humidity < 40 ? "DRY" : "NORMAL",
    },
    {
      label: "Rainfall",
      value: latest ? `${latest.rainfall} mm` : "--",
      icon: "☔",
      status: latest && parseFloat(latest.rainfall) > 2 ? "high" : "low",
      subtitle: latest && parseFloat(latest.rainfall) > 2 ? "RAINY" : "CLEAN",
    },
    {
      label: "UV Index",
      value: latest ? latest.uvIndex : "--",
      icon: "☀️",
      status: latest?.uvIndex === "high" ? "high" : latest?.uvIndex === "medium" ? "medium" : "low",
      subtitle: (latest?.uvIndex || "").toUpperCase(),
    },
    {
      label: "Wind",
      value: latest ? `${latest.windSpeed} km/h` : "--",
      icon: "💨",
      status: latest && latest.windSpeed > 15 ? "medium" : "low",
      subtitle: latest && latest.windSpeed > 10 ? "BREEZE" : "CALM",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-headline-lg text-primary">
            Weather Intelligence
          </h1>
          {latest && (
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Last updated:{" "}
              {latest.recordedAt.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              &mdash; {latest.condition}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => {
          const colors = severityConfig(metric.status);
          return (
            <div
              key={metric.label}
              className={`rounded-[24px] border-l-4 ${colors.border} ${colors.bg} p-5 shadow-sm`}
            >
              <span className="text-2xl block mb-2">{metric.icon}</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{metric.label}</p>
              <p className={`mt-1 font-heading text-headline-md font-bold ${colors.text}`}>
                {metric.value}
              </p>
              <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${colors.bg} ${colors.text}`}>
                {metric.subtitle}
              </span>
            </div>
          );
        })}
      </div>

      {activeAlerts.length > 0 && (
        <div className="mt-8 rounded-[24px] border border-error/20 bg-error-container/30 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-on-error-container font-bold">!</div>
            <h2 className="font-heading text-headline-md text-on-error-container">
              Active Alerts
            </h2>
          </div>
          <div className="space-y-3">
            {activeAlerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border-l-4 border-error bg-surface px-4 py-3"
              >
                <div>
                  <p className="font-body-sm text-body-sm text-foreground">{alert.label}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {alert.recordedAt.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    &mdash; {alert.temperature}°C / {alert.humidity}%
                  </p>
                </div>
                <span className="rounded-full bg-error-container text-on-error-container text-label-sm font-label-sm px-3 py-1">
                  {alert.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {chartData.length > 1 && (
        <div className="mt-8 rounded-[24px] border border-outline-variant/20 bg-card p-6 shadow-sm">
          <h2 className="font-heading text-headline-md text-primary mb-4">
            Environmental Trends
          </h2>
          <WeatherChart data={chartData} />
          <div className="mt-4 flex items-center justify-center gap-6 text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-tertiary" /> Temperature
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" /> Humidity
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-[24px] border border-outline-variant/20 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">📋</div>
            <h2 className="font-heading text-headline-md text-primary">
              Recommendations
            </h2>
          </div>
          {recommendations.length === 0 ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              No recommendations yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recommendations.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl bg-surface-container-low p-4"
                >
                  <p className="font-body-sm text-body-sm text-foreground">{r.message}</p>
                  <p className="mt-2 font-label-sm text-label-sm text-on-surface-variant">
                    {r.createdAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-[24px] border border-outline-variant/20 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center">🔮</div>
            <h2 className="font-heading text-headline-md text-primary">
              Intelligence Forecast
            </h2>
          </div>
          {latest ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-tertiary/10 p-5">
                <p className="font-label-md text-label-md text-primary mb-2">
                  Forecast Summary
                </p>
                <p className="font-body-sm text-body-sm text-foreground">
                  {latest.temperature > 30
                    ? "Cuaca panas dalam beberapa jam ke depan. Pastikan tanaman mendapat cukup air dan terlindung dari sinar langsung."
                    : latest.humidity > 80
                      ? "Kelembaban tinggi diperkirakan berlanjut. Periksa tanaman untuk tanda-tanda jamur dan pastikan sirkulasi udara."
                      : "Kondisi cuaca stabil. Waktu yang tepat untuk melakukan perawatan rutin dan pemupukan."}
                </p>
              </div>
              <div className="rounded-xl border border-outline-variant/20 p-4">
                <p className="font-label-md text-label-md text-primary mb-3">
                  Current Conditions
                </p>
                <div className="grid grid-cols-2 gap-3 text-body-sm">
                  <div>
                    <span className="text-on-surface-variant">Temperature:</span>{" "}
                    <span className="font-medium text-foreground">
                      {latest.temperature}°C
                    </span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant">Humidity:</span>{" "}
                    <span className="font-medium text-foreground">
                      {latest.humidity}%
                    </span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant">Wind:</span>{" "}
                    <span className="font-medium text-foreground">
                      {latest.windSpeed} km/h
                    </span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant">Condition:</span>{" "}
                    <span className="font-medium text-foreground capitalize">
                      {latest.condition}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              No forecast data available.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/admin/weather?refresh=1"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-tertiary text-white px-6 py-3 font-label-md shadow-lg transition-all hover:opacity-90 active:scale-95"
        >
          ⟳ Refresh Weather Data
        </a>
      </div>
    </div>
  );
}

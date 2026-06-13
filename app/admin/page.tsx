import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { syncWeatherData } from "@/lib/services/weather";
import { WeatherChart } from "@/components/admin/weather-chart";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

function severityConfig(severity: string) {
  switch (severity) {
    case "high":
      return { bg: "bg-error-container", text: "text-on-error-container", border: "border-error" };
    case "medium":
      return { bg: "bg-tertiary-container/20", text: "text-tertiary", border: "border-tertiary" };
    default:
      return { bg: "bg-secondary-container/30", text: "text-secondary", border: "border-secondary" };
  }
}

function getSeverity(temp: number, humidity: number) {
  if (temp > 35) return { level: "high" as const, label: "Suhu sangat panas — pindahkan tanaman ke tempat teduh" };
  if (temp < 18) return { level: "high" as const, label: "Suhu terlalu dingin — lindungi tanaman dari angin malam" };
  if (humidity < 40) return { level: "medium" as const, label: "Udara kering — semprot daun dengan air" };
  if (humidity > 85) return { level: "high" as const, label: "Kelembaban tinggi — waspada jamur" };
  return { level: "low" as const, label: "Kondisi optimal untuk perawatan tanaman" };
}

export default async function AdminDashboard(props: { searchParams?: Promise<{ refresh?: string }> }) {
  if (props.searchParams) {
    const params = await props.searchParams;
    if (params.refresh === "1") {
      await syncWeatherData();
      redirect("/admin");
    }
  }

  const [productCount, categoryCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  const weatherData = await prisma.weatherData.findMany({
    orderBy: { recordedAt: "asc" },
    take: 24,
  });

  const latest = weatherData[weatherData.length - 1] ?? null;
  const recommendations = await prisma.recommendation.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const chartData = weatherData.map((w) => ({
    time: w.recordedAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    temperature: w.temperature,
    humidity: w.humidity,
  }));

  const activeAlerts = weatherData
    .map((w) => ({ ...w, ...getSeverity(w.temperature, w.humidity) }))
    .filter((w) => w.level !== "low")
    .slice(-3);

  const weatherMetrics = latest
    ? [
        { label: "Temperature", value: `${latest.temperature}°C`, icon: "🌡", status: latest.temperature > 30 ? "high" : latest.temperature > 25 ? "medium" : "low", subtitle: latest.temperature > 30 ? "HOT" : "STABLE" },
        { label: "Humidity", value: `${latest.humidity}%`, icon: "💧", status: latest.humidity > 80 ? "high" : latest.humidity < 40 ? "medium" : "low", subtitle: latest.humidity > 80 ? "WET" : latest.humidity < 40 ? "DRY" : "NORMAL" },
        { label: "Rainfall", value: `${latest.rainfall} mm`, icon: "☔", status: parseFloat(latest.rainfall) > 2 ? "high" : "low", subtitle: parseFloat(latest.rainfall) > 2 ? "RAINY" : "CLEAN" },
        { label: "UV Index", value: latest.uvIndex, icon: "☀️", status: latest.uvIndex === "high" ? "high" : latest.uvIndex === "medium" ? "medium" : "low", subtitle: (latest.uvIndex || "").toUpperCase() },
        { label: "Wind", value: `${latest.windSpeed} km/h`, icon: "💨", status: latest.windSpeed > 15 ? "medium" : "low", subtitle: latest.windSpeed > 10 ? "BREEZE" : "CALM" },
      ]
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-headline-lg text-primary">Dashboard</h1>
          {latest && (
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              📍 Bandung, Indonesia &mdash; Terakhir diperbarui:{" "}
              {latest.recordedAt.toLocaleDateString("id-ID", {
                day: "numeric", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
          )}
        </div>
        <a
          href="/admin?refresh=1"
          className="inline-flex items-center gap-2 rounded-full bg-tertiary text-white px-6 py-3 font-label-md shadow-lg transition-all hover:opacity-90 active:scale-95"
        >
          ⟳ Refresh Data
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        {[
          { label: "Total Products", value: productCount, icon: "🌿" },
          { label: "Categories", value: categoryCount, icon: "📂" },
          { label: "Orders", value: orderCount, icon: "📦" },
          { label: "Users", value: userCount, icon: "👥" },
          { label: "Weather Status", value: latest ? "Active" : "No Data", icon: "🌤" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[24px] border border-outline-variant/20 bg-card p-5 shadow-sm">
            <span className="text-2xl block mb-2">{stat.icon}</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">{stat.label}</p>
            <p className="mt-1 font-heading text-headline-md font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {weatherMetrics.length > 0 && (
        <>
          <h2 className="font-heading text-headline-md text-primary mb-4">Weather Intelligence</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {weatherMetrics.map((metric) => {
              const colors = severityConfig(metric.status);
              return (
                <div key={metric.label} className={`rounded-[24px] border-l-4 ${colors.border} ${colors.bg} p-5 shadow-sm`}>
                  <span className="text-2xl block mb-2">{metric.icon}</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{metric.label}</p>
                  <p className={`mt-1 font-heading text-headline-md font-bold ${colors.text}`}>{metric.value}</p>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${colors.bg} ${colors.text}`}>
                    {metric.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeAlerts.length > 0 && (
        <div className="mt-8 rounded-[24px] border border-error/20 bg-error-container/30 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-on-error-container font-bold">!</div>
            <h2 className="font-heading text-headline-md text-on-error-container">Active Alerts</h2>
          </div>
          <div className="space-y-3">
            {activeAlerts.map((alert, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border-l-4 border-error bg-surface px-4 py-3">
                <div>
                  <p className="font-body-sm text-body-sm text-foreground">{alert.label}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {alert.recordedAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} &mdash; {alert.temperature}°C / {alert.humidity}%
                  </p>
                </div>
                <span className="rounded-full bg-error-container text-on-error-container text-label-sm font-label-sm px-3 py-1">{alert.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {chartData.length > 1 && (
          <div className="rounded-[24px] border border-outline-variant/20 bg-card p-6 shadow-sm">
            <h2 className="font-heading text-headline-md text-primary mb-4">Environmental Trends</h2>
            <WeatherChart data={chartData} />
            <div className="mt-4 flex items-center justify-center gap-6 text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-tertiary" /> Temperature</span>
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" /> Humidity</span>
            </div>
          </div>
        )}

        <div className="rounded-[24px] border border-outline-variant/20 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">📋</div>
            <h2 className="font-heading text-headline-md text-primary">Recommendations</h2>
          </div>
          {recommendations.length === 0 ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant">No recommendations yet.</p>
          ) : (
            <div className="space-y-3">
              {recommendations.map((r) => (
                <div key={r.id} className="rounded-xl bg-surface-container-low p-4">
                  <p className="font-body-sm text-body-sm text-foreground">{r.message}</p>
                  <p className="mt-2 font-label-sm text-label-sm text-on-surface-variant">
                    {r.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {latest && (
        <div className="mt-8 rounded-[24px] border border-outline-variant/20 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center">🔮</div>
            <h2 className="font-heading text-headline-md text-primary">Forecast</h2>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-tertiary/10 p-5">
            <p className="font-body-sm text-body-sm text-foreground">
              {latest.temperature > 30
                ? "Cuaca panas dalam beberapa jam ke depan. Pastikan tanaman mendapat cukup air dan terlindung dari sinar langsung."
                : latest.humidity > 80
                  ? "Kelembaban tinggi diperkirakan berlanjut. Periksa tanaman untuk tanda-tanda jamur dan pastikan sirkulasi udara."
                  : "Kondisi cuaca stabil. Waktu yang tepat untuk melakukan perawatan rutin dan pemupukan."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

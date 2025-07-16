import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/server/database/schema";
import {
  Activity,
  MousePointer,
  TrendingUp,
  CalendarPlus2Icon as CalendarIcon2,
} from "lucide-react";

export default function StatCards({
  link,
  clickData,
}: {
  link: Link;
  clickData: Array<{ date: string; clicks: number }>;
}) {
  const todayClicks =
    clickData.find((d) => d.date === new Date().toISOString().split("T")[0])
      ?.clicks || 0;

  const totalClicks = link.clicks;
  const avgDailyClicks =
    clickData.length > 0
      ? Math.round(
          clickData.reduce((sum, day) => sum + day.clicks, 0) / clickData.length
        )
      : 0;
  const daysActive = Math.ceil(
    (new Date().getTime() - new Date(link.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const stats = [
    {
      title: "Total Clicks",
      value: totalClicks.toLocaleString(),
      icon: MousePointer,
      color: "blue",
      bgGradient: "from-blue-500/10 to-blue-600/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      change: "+12%",
    },
    {
      title: "Today",
      value: todayClicks.toLocaleString(),
      icon: TrendingUp,
      color: "emerald",
      bgGradient: "from-emerald-500/10 to-emerald-600/20",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      change: "+8%",
    },
    {
      title: "Avg. Daily",
      value: avgDailyClicks.toLocaleString(),
      icon: Activity,
      color: "violet",
      bgGradient: "from-violet-500/10 to-violet-600/20",
      iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
      textColor: "text-violet-600",
      change: "+5%",
    },
    {
      title: "Days Active",
      value: daysActive.toString(),
      icon: CalendarIcon2,
      color: "amber",
      bgGradient: "from-amber-500/10 to-amber-600/20",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      change: "15 days",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
          style={{
            animationDelay: `${index * 100}ms`,
          }}>
          <CardContent className="p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-4 translate-x-4" />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.iconBg} shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {stat.value}
                  </p>
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${stat.textColor} bg-white/60 dark:bg-gray-800/60`}>
                    {stat.change}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="mt-3 space-y-1">
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.iconBg} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${Math.min((index + 1) * 25, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

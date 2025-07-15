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
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Clicks */}
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MousePointer className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="text-2xl font-semibold">
                {totalClicks.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Clicks */}
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-2xl font-semibold">
                {todayClicks.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Average Daily */}
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Activity className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Avg. Daily</p>
              <p className="text-2xl font-semibold">{avgDailyClicks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Days Active */}
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <CalendarIcon2 className="h-4 w-4 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Days Active</p>
              <p className="text-2xl font-semibold">{daysActive}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

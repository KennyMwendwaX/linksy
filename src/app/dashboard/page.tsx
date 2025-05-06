import { RecentLinksTable } from "./components/recent-links-table";
import { SectionCards } from "./components/section-cards";

export default function Dashboard() {
  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <SectionCards />
      <RecentLinksTable />
    </div>
  );
}

import { links } from "../data";
import { LinksTable } from "./components/links-table";

export default function Links() {
  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <LinksTable data={links} />
    </div>
  );
}

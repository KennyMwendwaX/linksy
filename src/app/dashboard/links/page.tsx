"use client";

import { links } from "../data";
import { LinksTable } from "./components/links-table/table";
import { columns } from "./components/links-table/table-columns";

export default function Links() {
  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <LinksTable data={links} columns={columns} />
    </div>
  );
}

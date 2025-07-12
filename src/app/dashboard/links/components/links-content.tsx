"use client";

import { Link } from "@/server/database/schema";
import { LinksTable } from "./links-table/table";
import { linksTableColumns } from "./links-table/table-columns";

type Props = {
  links: Link[];
};

export default function LinksContent({ links }: Props) {
  return <LinksTable links={links} columns={linksTableColumns} />;
}

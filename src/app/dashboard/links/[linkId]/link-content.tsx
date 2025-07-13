"use client";

import { Link } from "@/server/database/schema";
import { usePageTitle } from "../../providers/page-title-provider";

type Props = {
  link: Link;
};

export default function LinkContent({ link }: Props) {
  const { setDynamicTitle } = usePageTitle();

  setDynamicTitle(link.name);
  return (
    <div>
      <h2>{link.name}</h2>
      <p>{link.description}</p>
    </div>
  );
}

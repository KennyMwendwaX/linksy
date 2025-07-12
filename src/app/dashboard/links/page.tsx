import { tryCatch } from "@/lib/try-catch";
import LinksContent from "./components/links-content";
import { getUserLinks } from "@/server/actions/links/get";

export default async function Links() {
  const { data: links, error: linksError } = await tryCatch(getUserLinks());
  if (linksError) {
    console.error("Failed to fetch links:", linksError);
    return <div>Error loading links</div>;
  }

  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <LinksContent links={links} />
    </div>
  );
}

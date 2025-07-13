import { tryCatch } from "@/lib/try-catch";
import { getUserLink } from "@/server/actions/links/get";
import LinkContent from "./link-content";

type Props = {
  params: Promise<{ linkId: string }>;
};

export default async function LinkPage({ params }: Props) {
  const { linkId } = await params;

  const { data: link, error: linkError } = await tryCatch(getUserLink(linkId));
  if (linkError) {
    console.error("Failed to fetch link:", linkError);
    return <div>Error loading link</div>;
  }

  return (
    <>
      <LinkContent link={link} />
    </>
  );
}

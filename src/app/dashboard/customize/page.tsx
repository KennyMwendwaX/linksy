import { getMyProfileCustomization } from "@/server/actions/customizations/get";
import ProfileCustomization from "./components/profile-customization";
import { tryCatch } from "@/lib/try-catch";
import { getActiveUserLinks } from "@/server/actions/links/get";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Customize() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { data: profileCustomization, error: profileCustomizationError } =
    await tryCatch(getMyProfileCustomization());

  const { data: activeLinks, error: linksError } = await tryCatch(
    getActiveUserLinks()
  );

  if (profileCustomizationError) {
    return <div>Error loading profile customization</div>;
  }

  if (linksError) {
    return <div>Error loading links</div>;
  }

  const sessionInfo = {
    name: session.user.name,
    username: session.user.username ?? "default_username",
    image: session.user.image,
  };

  return (
    <>
      <ProfileCustomization
        customization={profileCustomization}
        links={activeLinks}
        sessionInfo={sessionInfo}
      />
    </>
  );
}

import { getProfileCustomization } from "@/server/actions/customizations/get";
import ProfileCustomization from "./components/profile-customization";
import { tryCatch } from "@/lib/try-catch";
import { getUserLinks } from "@/server/actions/links/get";

export default async function Customize() {
  const { data: profileCustomization, error: profileCustomizationError } =
    await tryCatch(getProfileCustomization());

  const { data: links, error: linksError } = await tryCatch(getUserLinks());

  if (profileCustomizationError) {
    return <div>Error loading profile customization</div>;
  }

  if (linksError) {
    return <div>Error loading links</div>;
  }

  return (
    <>
      <ProfileCustomization
        customization={profileCustomization}
        links={links}
      />
    </>
  );
}

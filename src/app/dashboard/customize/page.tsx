import { getProfileCustomization } from "@/server/actions/customizations/get";
import ProfileCustomization from "./components/profile-customization";
import { tryCatch } from "@/lib/try-catch";

export default async function Customize() {
  const { data: profileCustomization, error: profileCustomizationError } =
    await tryCatch(getProfileCustomization());

  if (profileCustomizationError) {
    // Handle error (e.g., show error message)
    return <div>Error loading profile customization</div>;
  }

  return (
    <>
      <ProfileCustomization customization={profileCustomization} />
    </>
  );
}

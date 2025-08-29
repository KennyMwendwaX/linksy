"use server";

import db from "@/server/database";
import { profileCustomizations, users } from "@/server/database/schema";
import { eq } from "drizzle-orm";

export const getProfileCustomization = async (username: string) => {
  try {
    console.log("Fetching profile customization for username:", username);
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!user) {
      throw new Error("User not found");
    }

    const userCustomization = await db.query.profileCustomizations.findFirst({
      where: eq(profileCustomizations.userId, user.id),
    });

    return userCustomization;
  } catch (error) {
    console.error("Error fetching user profile customization:", error);
    throw new Error("Failed to fetch user profile customization");
  }
};

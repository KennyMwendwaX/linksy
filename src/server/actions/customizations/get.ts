"use server";

import { auth } from "@/lib/auth";
import db from "@/server/database";
import { profileCustomizations, users } from "@/server/database/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getMyProfileCustomization = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const userCustomization = await db.query.profileCustomizations.findFirst({
      where: eq(profileCustomizations.userId, parseInt(session.user.id)),
    });

    return userCustomization;
  } catch (error) {
    console.error("Error fetching user profile customization:", error);
    throw new Error("Failed to fetch user profile customization");
  }
};

export const getUserProfileCustomization = async (username: string) => {
  try {
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

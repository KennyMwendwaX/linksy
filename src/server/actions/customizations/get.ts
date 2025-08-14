"use server";

import { auth } from "@/lib/auth";
import db from "@/server/database";
import { profileCustomizations } from "@/server/database/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getProfileCustomization = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const userId = session.user.id;

    const userCustomization = await db.query.profileCustomizations.findFirst({
      where: eq(profileCustomizations.userId, parseInt(userId)),
    });

    return userCustomization;
  } catch (error) {
    console.error("Error fetching user profile customization:", error);
    throw new Error("Failed to fetch user profile customization");
  }
};

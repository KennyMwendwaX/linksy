"use server";

import db from "@/server/database";
import { users } from "@/server/database/schema";
import { eq } from "drizzle-orm";

export const getUserProfileInfo = async (username: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!user) {
      throw new Error("User not found");
    }

    return {
      name: user.name,
      username: user.username,
      image: user.image,
    };
  } catch (error) {
    console.error("Error fetching user profile info:", error);
    throw new Error("Failed to fetch user profile info");
  }
};

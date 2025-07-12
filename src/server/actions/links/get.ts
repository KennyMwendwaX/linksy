import { auth } from "@/lib/auth";
import db from "@/server/database";
import { links } from "@/server/database/schema";
import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getUserLinks = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const userId = session.user.id;

    const userLinks = await db.query.links.findMany({
      where: eq(links.userId, parseInt(userId)),
      orderBy: [desc(links.createdAt)],
    });

    return userLinks;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw new Error("Failed to fetch links");
  }
};

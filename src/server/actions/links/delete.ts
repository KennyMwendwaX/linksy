"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/server/database";
import { eq } from "drizzle-orm";
import { links } from "@/server/database/schema";

export const deleteLink = async (slug: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const linkToDelete = await db.query.links.findFirst({
      where: eq(links.slug, slug),
    });

    if (!linkToDelete) {
      throw new Error("Link not found");
    }

    if (linkToDelete.userId !== parseInt(session.user.id, 10)) {
      throw new Error("You do not have permission to delete this link");
    }

    const deletedLink = await db
      .delete(links)
      .where(eq(links.slug, slug))
      .returning();

    if (!deletedLink) {
      throw new Error("Failed to delete link");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting link:", error);
    throw new Error("Failed to delete link");
  }
};

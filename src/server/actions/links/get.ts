"use server";

import { auth } from "@/lib/auth";
import db from "@/server/database";
import { links } from "@/server/database/schema";
import { and, desc, eq } from "drizzle-orm";
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

export const getUserLink = async (linkId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const userId = session.user.id;

    const link = await db.query.links.findFirst({
      where: and(
        eq(links.id, parseInt(linkId)),
        eq(links.userId, parseInt(userId))
      ),
    });

    if (!link) {
      throw new Error("Link not found");
    }

    return link;
  } catch (error) {
    console.error("Error fetching link:", error);
    throw new Error("Failed to fetch link");
  }
};

export const getActiveUserLinks = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const userId = session.user.id;

    const activeUserLinks = await db.query.links.findMany({
      where: and(
        eq(links.userId, parseInt(userId)),
        eq(links.status, "active")
      ),
      orderBy: [desc(links.createdAt)],
    });

    return activeUserLinks;
  } catch (error) {
    console.error("Error fetching active user links:", error);
    throw new Error("Failed to fetch active user links");
  }
};

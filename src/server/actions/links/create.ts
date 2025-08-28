"use server";

import { auth } from "@/lib/auth";
import { LinkFormData } from "@/lib/link-schema";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import db from "@/server/database";
import { desc, eq } from "drizzle-orm";
import { links } from "@/server/database/schema";
import { fractionalOrder } from "@/lib/fractional-order";

export const createLink = async (linkFormData: LinkFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    // Get the last link to determine new order position
    const lastLink = await db.query.links.findFirst({
      where: eq(links.userId, parseInt(session.user.id)),
      orderBy: desc(links.profileOrder),
    });

    const newOrder = fractionalOrder(lastLink?.profileOrder, undefined);

    const slug = linkFormData.customSlug || nanoid(8);

    const existingSlug = await db.query.links.findFirst({
      where: eq(links.slug, slug),
    });

    if (existingSlug) {
      throw new Error("Slug already in use. Please choose another.");
    }

    const [newLink] = await db
      .insert(links)
      .values({
        name: linkFormData.name,
        originalUrl: linkFormData.originalUrl,
        slug: slug,
        description: linkFormData.description || null,
        status: linkFormData.status,
        profileOrder: newOrder,
        expirationDate: linkFormData.expirationDate
          ? new Date(linkFormData.expirationDate)
          : null,
        isProtected: linkFormData.isProtected || false,
        password: linkFormData.isProtected
          ? linkFormData.password || null
          : null,
        tags: linkFormData.tags || [],
        userId: parseInt(session.user.id, 10),
      })
      .returning();

    if (!newLink) {
      throw new Error("Failed to create link");
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating link:", error);
    throw new Error("Failed to create link");
  }
};

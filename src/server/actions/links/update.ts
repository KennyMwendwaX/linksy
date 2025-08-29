"use server";

import { auth } from "@/lib/auth";
import { LinkFormData } from "@/lib/link-schema";
import db from "@/server/database";
import { links } from "@/server/database/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const updateLink = async (
  linkId: number,
  linkFormData: LinkFormData
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const userId = parseInt(session.user.id, 10);

    const existingLink = await db.query.links.findFirst({
      where: eq(links.id, linkId),
    });

    if (!existingLink) {
      throw new Error("Link not found");
    }

    if (existingLink.userId !== userId) {
      throw new Error("You do not have permission to update this link");
    }

    const slug = linkFormData.customSlug || existingLink.slug;

    const existingSlug = await db.query.links.findFirst({
      where: and(eq(links.slug, slug), eq(links.id, linkId)),
    });

    if (existingSlug && existingSlug.id !== linkId) {
      throw new Error("Slug already in use. Please choose another.");
    }

    const [updatedLink] = await db
      .update(links)
      .set({
        name: linkFormData.name,
        originalUrl: linkFormData.originalUrl,
        slug: slug,
        description: linkFormData.description || null,
        status: linkFormData.status,
        expirationDate: linkFormData.expirationDate
          ? new Date(linkFormData.expirationDate)
          : null,
        isProtected: linkFormData.isProtected || false,
        password: linkFormData.isProtected
          ? linkFormData.password || null
          : null,
        tags: linkFormData.tags || [],
      })
      .where(eq(links.id, linkId))
      .returning();

    if (!updatedLink) {
      throw new Error("Failed to update link");
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating link:", error);
    throw new Error("Failed to update link");
  }
};

export async function toggleLinkVisibility(linkId: number, isVisible: boolean) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No active session found");
    }

    const userId = parseInt(session.user.id, 10);

    const existingLink = await db.query.links.findFirst({
      where: eq(links.id, linkId),
    });

    if (!existingLink) {
      throw new Error("Link not found");
    }

    if (existingLink.userId !== userId) {
      throw new Error("You do not have permission to update this link");
    }

    const [updatedLink] = await db
      .update(links)
      .set({
        isVisibleOnProfile: isVisible,
      })
      .where(eq(links.id, linkId))
      .returning();

    if (!updatedLink) {
      throw new Error("Failed to update link");
    }

    revalidatePath("/dashboard/customization");

    return { success: true };
  } catch (error) {
    console.error("Error updating link visibility:", error);
    throw new Error("Failed to update link visibility");
  }
}

"use server";

import { auth } from "@/lib/auth";
import { fractionalOrder } from "@/lib/fractional-order";
import db from "@/server/database";
import { links } from "@/server/database/schema";
import { asc, eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reorderLinkSchema = z.object({
  linkId: z.number(),
  newIndex: z.number().min(0),
});

export async function reorderLink(linkId: number, newIndex: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate input
    const validation = reorderLinkSchema.safeParse({ linkId, newIndex });
    if (!validation.success) {
      return { success: false, error: "Invalid input parameters" };
    }

    const userId = parseInt(session.user.id);

    const userOrderedLinks = await db.query.links.findMany({
      where: eq(links.userId, userId),
      orderBy: asc(links.profileOrder),
    });

    const linkToMove = userOrderedLinks.find((link) => link.id === linkId);
    if (!linkToMove) {
      return { success: false, error: "Link not found" };
    }

    // Remove the link from the array
    const otherLinks = userOrderedLinks.filter((link) => link.id !== linkId);

    // Calculate new profile order
    let newOrder: string;

    if (newIndex === 0) {
      // Moving to first position
      const firstLink = otherLinks[0];
      newOrder = fractionalOrder(undefined, firstLink?.profileOrder);
    } else if (newIndex >= otherLinks.length) {
      // Moving to last position
      const lastLink = otherLinks[otherLinks.length - 1];
      newOrder = fractionalOrder(lastLink?.profileOrder, undefined);
    } else {
      // Moving between two links
      const prevLink = otherLinks[newIndex - 1];
      const nextLink = otherLinks[newIndex];
      newOrder = fractionalOrder(prevLink.profileOrder, nextLink.profileOrder);
    }

    // Update in transaction
    await db.transaction(async (tx) => {
      // Verify ownership again within transaction
      const link = await tx.query.links.findFirst({
        where: and(eq(links.id, linkId), eq(links.userId, userId)),
      });

      if (!link) {
        throw new Error("Link not found or unauthorized");
      }

      await tx
        .update(links)
        .set({
          profileOrder: newOrder,
        })
        .where(eq(links.id, linkId));
    });

    // Revalidate relevant paths
    revalidatePath("/dashboard/links");
    revalidatePath("/dashboard/customization");

    return { success: true };
  } catch (error) {
    console.error("Reorder link error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to reorder link",
    };
  }
}

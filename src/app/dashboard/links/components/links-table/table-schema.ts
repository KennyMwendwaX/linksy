import { z } from "zod";
import { CheckCircle, PauseCircle, Clock } from "lucide-react"; // Example icons from lucide-react
import type { ComponentType } from "react";

export const linkSchema = z.object({
  id: z.string(),
  name: z.string(),
  originalUrl: z.string().url(),
  shortUrl: z.string().url(),
  createdAt: z.string().datetime(),
  clicks: z.number().int().nonnegative(),
  status: z.enum(["active", "inactive", "expired"]),
  expirationDate: z.string().datetime().optional(),
  lastAccessedAt: z.string().datetime().optional(),
  isProtected: z.boolean().default(false),
});

export type Link = z.infer<typeof linkSchema>;

export const statuses: {
  label: string;
  value: z.infer<typeof linkSchema>["status"];
  icon: ComponentType<{ className?: string }>;
}[] = [
  {
    label: "Active",
    value: "active",
    icon: CheckCircle,
  },
  {
    label: "Inactive",
    value: "inactive",
    icon: PauseCircle,
  },
  {
    label: "Expired",
    value: "expired",
    icon: Clock,
  },
];

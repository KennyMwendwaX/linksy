import { z } from "zod";

export const linkSchema = z.object({
  id: z.string(),
  name: z.string(),
  originalUrl: z.string().url(),
  shortUrl: z.string().url(),
  createdAt: z.date(),
  clicks: z.number().int().nonnegative(),
  status: z.enum(["active", "inactive", "expired", "archived"]),
  expirationDate: z.date().optional(),
  lastAccessedAt: z.date().optional(),
  isProtected: z.boolean().default(false),
});

export type Link = z.infer<typeof linkSchema>;

export const linkFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters"),
    originalUrl: z.string().url("Please enter a valid URL"),
    customSlug: z
      .string()
      .optional()
      .refine((val) => !val || /^[a-zA-Z0-9-_]+$/.test(val), {
        message:
          "Custom slug can only contain letters, numbers, hyphens, and underscores",
      }),
    description: z
      .string()
      .max(500, "Description must be less than 500 characters")
      .optional(),
    status: z.enum(["active", "inactive", "expired", "archived"]),
    expirationDate: z.date().optional(),
    isProtected: z.boolean(),
    password: z.string().optional(),
    tags: z.array(z.string()),
  })
  .refine(
    (data) => {
      if (data.isProtected && (!data.password || data.password.length < 4)) {
        return false;
      }
      return true;
    },
    {
      message: "Password must be at least 4 characters when link is protected",
      path: ["password"],
    }
  );

export type LinkFormData = z.infer<typeof linkFormSchema>;

import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  json,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
});

// Accounts table
export const accounts = pgTable("account", {
  id: serial("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Sessions table
export const sessions = pgTable("session", {
  id: serial("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Verifications table
export const verifications = pgTable("verification", {
  id: serial("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// Links table
export const links = pgTable("link", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  originalUrl: text("original_url").notNull(),
  slug: text("slug").notNull().unique(),
  clicks: integer("clicks").default(0).notNull(),
  status: text("status")
    .$type<"active" | "inactive" | "expired" | "archived">()
    .notNull(),
  expirationDate: timestamp("expiration_date"),
  lastAccessedAt: timestamp("last_accessed_at"),
  isProtected: boolean("is_protected").default(false).notNull(),
  password: text("password"),
  description: text("description"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Click events table
export const clickEvents = pgTable("click_event", {
  id: serial("id").primaryKey(),
  clickedAt: timestamp("clicked_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  referrer: text("referrer"),
  ip: text("ip"),
  userAgent: text("user_agent"),
  linkId: integer("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
});

// User customizations table
export const userCustomizations = pgTable("user_customization", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),

  // Profile settings
  customProfileImage: text("custom_profile_image"),
  showProfilePicture: boolean("show_profile_picture").default(true).notNull(),
  showProfileName: boolean("show_profile_name").default(true).notNull(),

  // Color customization
  textColor: text("text_color").default("#000000"),
  secondaryTextColor: text("secondary_text_color").default("#666666"),

  // Background customization
  backgroundType: text("background_type")
    .$type<"color" | "gradient" | "image">()
    .default("color")
    .notNull(),
  backgroundColor: text("background_color").default("#ffffff"), // Hex color
  backgroundGradient: json("background_gradient").$type<{
    from: string;
    to: string;
    direction?:
      | "to-r"
      | "to-l"
      | "to-t"
      | "to-b"
      | "to-br"
      | "to-bl"
      | "to-tr"
      | "to-tl";
  }>(),
  backgroundImage: text("background_image"),
  buttonStyle: json("button_style")
    .$type<{
      shape: "rounded" | "square" | "pill";
      variant: "default" | "outline" | "ghost" | "destructive" | "secondary";
      size: "sm" | "default" | "lg";
      backgroundColor: string;
      textColor: string;
      borderColor?: string;
      hoverBackgroundColor?: string;
      hoverTextColor?: string;
    }>()
    .default({
      shape: "rounded",
      variant: "default",
      size: "default",
      backgroundColor: "#000000",
      textColor: "#ffffff",
      borderColor: "#000000",
      hoverBackgroundColor: "#333333",
      hoverTextColor: "#ffffff",
    }),

  // Link ordering and visibility
  linkOrder: json("link_order").$type<number[]>().default([]),
  maxLinksToShow: integer("max_links_to_show").default(10),

  theme: text("theme")
    .$type<"light" | "dark" | "auto">()
    .default("light")
    .notNull(),
  layout: text("layout")
    .$type<"centered" | "left" | "right">()
    .default("centered")
    .notNull(),

  customCss: text("custom_css"),
  socialLinks: json("social_links").$type<{
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  }>(),

  bio: text("bio"),

  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),

  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
});

// Define relationships
export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  links: many(links),
  customization: one(userCustomizations, {
    fields: [users.id],
    references: [userCustomizations.userId],
  }),
}));

export const linksRelations = relations(links, ({ one, many }) => ({
  user: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
  clickEvents: many(clickEvents),
}));

export const clickEventsRelations = relations(clickEvents, ({ one }) => ({
  link: one(links, {
    fields: [clickEvents.linkId],
    references: [links.id],
  }),
}));

export const userCustomizationsRelations = relations(
  userCustomizations,
  ({ one }) => ({
    user: one(users, {
      fields: [userCustomizations.userId],
      references: [users.id],
    }),
  })
);

// Type inference
export type User = typeof users.$inferSelect;
export type Link = typeof links.$inferSelect;
export type ClickEvent = typeof clickEvents.$inferSelect;
export type UserCustomization = typeof userCustomizations.$inferSelect;
export type UserCustomizationInsert = typeof userCustomizations.$inferInsert;

// Default customization settings
export const DEFAULT_CUSTOMIZATION: Partial<UserCustomizationInsert> = {
  showProfilePicture: true,
  showProfileName: true,
  textColor: "#000000",
  secondaryTextColor: "#666666",
  backgroundType: "color",
  backgroundColor: "#ffffff",
  buttonStyle: {
    shape: "rounded",
    variant: "default",
    size: "default",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    borderColor: "#000000",
    hoverBackgroundColor: "#333333",
    hoverTextColor: "#ffffff",
  },
  linkOrder: [],
  maxLinksToShow: 10,
  theme: "light",
  layout: "centered",
};

import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { ThemeConfig } from "@/lib/types";

// Users table
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
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
  // Profile display configuration
  displayStyle: text("display_style")
    .$type<"default" | "social">()
    .default("default")
    .notNull(),
  profileOrder: integer("profile_order").notNull(),
  isVisibleOnProfile: boolean("is_visible_on_profile").default(true).notNull(),
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

// Profile customization table for public-facing page styling
export const profileCustomizations = pgTable("profile_customization", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  bio: text("bio"),
  isPublic: boolean("is_public").default(true).notNull(),
  // Store theme configuration as JSONB for flexibility
  themeConfig: jsonb("theme_config").$type<ThemeConfig>(),
  // Layout configuration
  showSocialLinksSection: boolean("show_social_links_section")
    .default(true)
    .notNull(),
  socialLinksPosition: text("social_links_position")
    .$type<"top" | "bottom" | "side">()
    .default("bottom")
    .notNull(),
  maxLinksPerRow: integer("max_links_per_row").default(1).notNull(), // For default button layout
  maxSocialLinksPerRow: integer("max_social_links_per_row")
    .default(6)
    .notNull(), // For social buttons
  // SEO metadata
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords").array(),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
});

// Profile views table for analytics
export const profileViews = pgTable("profile_view", {
  id: serial("id").primaryKey(),
  profileCustomizationId: integer("profile_customization_id")
    .notNull()
    .references(() => profileCustomizations.id, { onDelete: "cascade" }),
  viewedAt: timestamp("viewed_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  referrer: text("referrer"),
  ip: text("ip"),
  userAgent: text("user_agent"),
  country: text("country"),
  city: text("city"),
});

// Define relationships
export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  links: many(links),
  profileCustomization: one(profileCustomizations, {
    fields: [users.id],
    references: [profileCustomizations.userId],
  }),
}));

export const profileCustomizationsRelations = relations(
  profileCustomizations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [profileCustomizations.userId],
      references: [users.id],
    }),
    views: many(profileViews),
  })
);

export const profileViewsRelations = relations(profileViews, ({ one }) => ({
  profileCustomization: one(profileCustomizations, {
    fields: [profileViews.profileCustomizationId],
    references: [profileCustomizations.id],
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

// Type inference
export type User = typeof users.$inferSelect;
export type Link = typeof links.$inferSelect;
export type ClickEvent = typeof clickEvents.$inferSelect;
export type ProfileCustomization = typeof profileCustomizations.$inferSelect;
export type ProfileView = typeof profileViews.$inferSelect;

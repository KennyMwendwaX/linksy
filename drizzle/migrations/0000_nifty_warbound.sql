CREATE TABLE "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" integer NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "click_event" (
	"id" serial PRIMARY KEY NOT NULL,
	"clicked_at" timestamp (3) DEFAULT now() NOT NULL,
	"referrer" text,
	"ip" text,
	"user_agent" text,
	"link_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "link" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"original_url" text NOT NULL,
	"slug" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"status" text NOT NULL,
	"expiration_date" timestamp,
	"last_accessed_at" timestamp,
	"is_protected" boolean DEFAULT false NOT NULL,
	"password" text,
	"description" text,
	"tags" text[],
	"display_style" text DEFAULT 'default' NOT NULL,
	"profile_order" text NOT NULL,
	"is_visible_on_profile" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "link_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "profile_customization" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"bio" text,
	"is_public" boolean DEFAULT true NOT NULL,
	"theme_config" jsonb,
	"show_social_links_section" boolean DEFAULT true NOT NULL,
	"max_links_per_row" integer DEFAULT 1 NOT NULL,
	"max_social_links_per_row" integer DEFAULT 6 NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"meta_keywords" text[],
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	CONSTRAINT "profile_customization_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "profile_view" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_customization_id" integer NOT NULL,
	"viewed_at" timestamp (3) DEFAULT now() NOT NULL,
	"referrer" text,
	"ip" text,
	"user_agent" text,
	"country" text,
	"city" text
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" integer NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"display_username" text,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "click_event" ADD CONSTRAINT "click_event_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_customization" ADD CONSTRAINT "profile_customization_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_view" ADD CONSTRAINT "profile_view_profile_customization_id_profile_customization_id_fk" FOREIGN KEY ("profile_customization_id") REFERENCES "public"."profile_customization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
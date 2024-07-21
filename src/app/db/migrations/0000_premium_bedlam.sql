CREATE TABLE IF NOT EXISTS "bank_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"bank_name" text NOT NULL,
	"account_number" integer NOT NULL,
	"account_name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"currency" text NOT NULL,
	CONSTRAINT "bank_info_owner_id_unique" UNIQUE("owner_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"owner_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"customer_id" integer NOT NULL,
	"title" text NOT NULL,
	"items" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"total_amount" integer NOT NULL
);

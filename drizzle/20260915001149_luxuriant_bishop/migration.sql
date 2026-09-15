CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY,
	"roomName" varchar(255) NOT NULL,
	"type" varchar(100) NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"is_available" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY,
	"serviceName" varchar(255) NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"is_available" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";
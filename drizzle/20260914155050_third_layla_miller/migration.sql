CREATE TYPE "user_role" AS ENUM('CUSTOMER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"fullName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'CUSTOMER'::"user_role" NOT NULL,
	"avatar" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);

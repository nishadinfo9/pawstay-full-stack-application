CREATE TABLE "pets" (
	"id" serial PRIMARY KEY,
	"user_id" integer,
	"petName" varchar(255) NOT NULL,
	"type" varchar(100) NOT NULL,
	"breed" varchar(100) NOT NULL,
	"age" integer NOT NULL,
	"gender" varchar(50) NOT NULL,
	"image" text,
	"notes" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
CREATE TYPE "booking_status" AS ENUM('PENDING', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY,
	"user_id" integer,
	"pet_id" integer,
	"room_id" integer,
	"check_in_date" date NOT NULL,
	"check_out_date" date NOT NULL,
	"room_price" numeric(10,2) NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING'::"booking_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_pet_id_pets_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_pets_id_fkey" FOREIGN KEY ("room_id") REFERENCES "pets"("id") ON DELETE SET NULL;
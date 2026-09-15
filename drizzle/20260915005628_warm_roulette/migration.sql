CREATE TYPE "invoice_status" AS ENUM('PENDING', 'PAID', 'PARTIALLY_PAID', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" serial PRIMARY KEY,
	"booking_id" integer,
	"total_amount" numeric(10,2) NOT NULL,
	"status" "invoice_status" DEFAULT 'PENDING'::"invoice_status",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE;
CREATE TYPE "payment_status" AS ENUM('PENDING', 'PAID', 'FAILED');--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY,
	"invoice_id" integer,
	"amount" numeric(10,2) NOT NULL,
	"status" "payment_status" DEFAULT 'PENDING'::"payment_status" NOT NULL,
	"transaction_id" varchar NOT NULL UNIQUE,
	"paid_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL;
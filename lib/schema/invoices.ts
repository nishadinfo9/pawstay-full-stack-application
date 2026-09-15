import { integer, numeric, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";

export const invoicesStatusEnum = pgEnum('invoice_status', [
    'PENDING',
    'PAID',
    'PARTIALLY_PAID',
    'CANCELLED',
])

export const invoices = pgTable('invoices', {
    id: serial('id').primaryKey(),
    bookingId: integer('booking_id').references(() => bookings.id, { onDelete: 'cascade' }),
    total_amount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
    status: invoicesStatusEnum('status').default('PENDING'),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull()
})
import { date, integer, numeric, pgEnum, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { invoices } from "./invoices";

export const paymentStatusEnum = pgEnum('payment_status', [
    'PENDING',
    'PAID',
    'FAILED',
])

export const payments = pgTable('payments', {
    id: uuid('id').primaryKey().defaultRandom(),
    invoiceId: uuid('invoice_id').references(() => invoices.id, { onDelete: 'set null' }).notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    status: paymentStatusEnum('status').default('PENDING').notNull(),
    transactionId: varchar('transaction_id').unique().notNull(),
    paidAt: timestamp('paid_at',{withTimezone: true}).defaultNow().notNull(),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow().notNull(),
})
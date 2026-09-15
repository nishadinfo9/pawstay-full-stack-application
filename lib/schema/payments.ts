import { date, integer, numeric, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { invoices } from "./invoices";

export const paymentStatusEnum = pgEnum('payment_status', [
    'PENDING',
    'PAID',
    'FAILED',
])

export const payments = pgTable('payments', {
    id: serial('id').primaryKey(),
    invoiceId: integer('invoice_id').references(() => invoices.id, { onDelete: 'set null' }),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    status: paymentStatusEnum('status').default('PENDING').notNull(),
    transactionId: varchar('transaction_id').unique().notNull(),
    paidAt: timestamp('paid_at',{withTimezone: true}).defaultNow().notNull(),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow().notNull(),
})
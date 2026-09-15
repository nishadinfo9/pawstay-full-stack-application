import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { invoices } from "./invoices";

export const invoiceItems = pgTable('invoice_items',{
    id: serial('id').primaryKey(),
    invoiceId: integer('invoice_id').references(()=> invoices.id,{onDelete: 'cascade'}),
    description: varchar('description',{length: 500}).notNull(),
    quantity: integer('quantity').default(1).notNull(),
    unitPrice: numeric('unit_price', {precision: 10, scale: 2}).notNull(),
    totalPrice: numeric('total_price', {precision: 10, scale: 2}).notNull()
})
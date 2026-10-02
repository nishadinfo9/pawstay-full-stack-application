import { integer, numeric, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { invoices } from "./invoices";

export const invoiceItems = pgTable('invoice_items',{
    id: uuid('id').primaryKey().defaultRandom(),
    invoiceId: uuid('invoice_id').references(()=> invoices.id,{onDelete: 'cascade'}).notNull(),
    description: varchar('description',{length: 500}).notNull(),
    quantity: integer('quantity').default(1).notNull(),
    unitPrice: numeric('unit_price', {precision: 10, scale: 2}).notNull(),
    totalPrice: numeric('total_price', {precision: 10, scale: 2}).notNull()
})
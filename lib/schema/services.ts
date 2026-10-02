import { boolean, numeric, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const services = pgTable('services',{
    id: uuid('id').primaryKey().defaultRandom(),
    serviceName: varchar('serviceName',{length: 255}).notNull(),
    price: numeric('price', {precision: 10, scale: 2}).notNull(),
    is_available: boolean('is_available').default(true),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow().notNull()
})
import { integer, numeric, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { services } from "./services";

export const bookingServices = pgTable('booking_services',{
    id: uuid('id').primaryKey().defaultRandom(),
    bookingId: uuid('booking_id').references(()=> bookings.id, {onDelete: 'cascade'}).notNull(),
    serviceId: uuid('service_id').references(()=> services.id, {onDelete: 'set null'}).notNull(),
    price: numeric('price', { precision: 10,scale: 2}).notNull(),
    quantity: integer('quantity').default(1).notNull(),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow().notNull()
})
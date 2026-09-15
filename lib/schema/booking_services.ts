import { integer, numeric, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { services } from "./services";

export const bookingServices = pgTable('booking_services',{
    id: serial('id').primaryKey(),
    bookingId: integer('booking_id').references(()=> bookings.id, {onDelete: 'cascade'}).notNull(),
    serviceId: integer('service_id').references(()=> services.id, {onDelete: 'set null'}).notNull(),
    price: numeric('price', { precision: 10,scale: 2}).notNull(),
    quantity: integer('quantity').default(1).notNull(),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow().notNull()
})
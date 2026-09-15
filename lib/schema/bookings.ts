import { date, integer, numeric, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { pets } from "./pets";

export const bookingStatusEnum = pgEnum('booking_status', [
    'PENDING',
    'CONFIRMED',
    'CHECKED_IN',
    'COMPLETED',
    'CANCELLED',
])

export const bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    petId: integer('pet_id').references(() => pets.id, { onDelete: 'cascade' }),
    roomId: integer('room_id').references(() => pets.id, { onDelete: 'set null' }),
    checkInDate: date('check_in_date').notNull(),
    checkOutDate: date('check_out_date').notNull(),
    roomPrice: numeric('room_price', { precision: 10, scale: 2 }).notNull(),
    status: bookingStatusEnum('status').notNull().default('PENDING'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})
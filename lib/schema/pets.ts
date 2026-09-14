import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const pets = pgTable('pets',{
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(()=> users.id, {onDelete: 'cascade'}),
    petName: varchar('petName',{length: 255}).notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    breed: varchar("breed", { length: 100 }).notNull(),
    age: integer('age').notNull(),
    gender: varchar("gender", { length: 50 }).notNull(),
    image: text('image'),
    notes: varchar('notes', {length: 500}),
    created_at: timestamp('created_at', {withTimezone: true}).defaultNow().notNull()
})
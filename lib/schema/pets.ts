import { integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const pets = pgTable('pets',{
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id').references(()=> users.id, {onDelete: 'cascade'}).notNull(),
    petName: varchar('petName',{length: 255}).notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    breed: varchar("breed", { length: 100 }).notNull(),
    age: integer('age').notNull(),
    gender: varchar("gender", { length: 50 }).notNull(),
    image: text('image'),
    notes: varchar('notes', {length: 500}),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull()
})
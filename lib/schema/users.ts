import { pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", [
    "CUSTOMER",
    "ADMIN",
]);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: varchar('fullName', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    role: roleEnum('role').notNull().default('CUSTOMER'),
    avatar: text('avatar'),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull()
})
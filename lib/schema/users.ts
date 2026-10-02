import { pgEnum, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", [
    "customer",
    "admin",
]);

export const providerEnum = pgEnum("provider_role", [
    "cre",
    "admin",
]);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    fullName: varchar('fullName', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    provider: varchar("provider", { length: 20 }),
    externalId: varchar("external_id", { length: 100 }),
    role: roleEnum('role').notNull().default('customer'),
    avatar: text('avatar'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
})
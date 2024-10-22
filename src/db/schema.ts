import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
export const StatusEnum = pgEnum("status", [
  "open",
  "paid",
  "void",
  "uncollectible",
]);
export const Invoice = pgTable("invoices", {
  id:serial("id").primaryKey().notNull(),
  createTs: timestamp("createTS").notNull().defaultNow(),
  status: StatusEnum("status"),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
});
export const Invoices = pgTable("invoice", {
  id:serial("id").primaryKey().notNull(),
  createTs: timestamp("createTS").notNull().defaultNow(),
  // status: text("status"),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
});

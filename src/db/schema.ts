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
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTS").notNull().defaultNow(),

  status: StatusEnum("status").notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
});

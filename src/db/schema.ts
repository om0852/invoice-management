import { status } from "@/data/invoices";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export type Status = typeof status[number]["id"];
const statuses = status.map(({id})=>id) as Array<Status>;
export const StatusEnum = pgEnum("status", statuses as [Status,...Array<Status>]);
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

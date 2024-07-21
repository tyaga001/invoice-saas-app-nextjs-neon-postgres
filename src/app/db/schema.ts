import {  text, serial, pgTable, timestamp, numeric } from "drizzle-orm/pg-core";

//👇🏻 invoice table with its column types
export const invoicesTable = pgTable("invoices", {
    id: serial("id").primaryKey().notNull(),
    owner_id: text("owner_id").notNull(),
    customer_id: text("customer_id").notNull(),
    title: text("title").notNull(),
    items: text("items").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    total_amount: numeric("total_amount").notNull(),
});

//👇🏻 customers table with its column types
export const customersTable = pgTable("customers", {
    id: serial("id").primaryKey().notNull(),
    created_at: timestamp("created_at").defaultNow(),
    owner_id: text("owner_id").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    address: text("address").notNull(),
})

//👇🏻 bank_info table with its column types
export const bankInfoTable = pgTable("bank_info", {
    id: serial("id").primaryKey().notNull(),
    owner_id: text("owner_id").notNull().unique(),
    bank_name: text("bank_name").notNull(),
    account_number: numeric("account_number").notNull(),
    account_name: text("account_name").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    currency: text("currency").notNull(),
})
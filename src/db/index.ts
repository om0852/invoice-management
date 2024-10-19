import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { Pool } from "pg";


const  pool = new Pool({
    connectionString:process.env.XATA_DATABASE_URL,
    max:20
})

export const db = drizzle(pool);


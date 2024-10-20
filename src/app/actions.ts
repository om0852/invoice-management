
"use server"

import { db } from "@/db";
import { Invoice } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createAction(formData:FormData){
const value = Math.floor(parseFloat(String(formData.get("value")))*100);
const description  = formData.get('description') as string;
const name  = formData.get('name') as string;
const result = await db.insert(Invoice).values({
    value,description,status:"open"
}).returning({
    id:Invoice.id
})
redirect(`/invoices/${result[0].id}`)
// console.log(formData)
  }
"use server";

import { db } from "@/db";
import { Invoice, Status } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export async function createAction(formData: FormData) {
  const { userId } = auth();
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;
  if (!userId) {
    return;
  }
  const result = await db
    .insert(Invoice)
    .values({
      value,
      userId,
      description,
      status:"open"
    })
    .returning({
      id: Invoice.id,
    });
  redirect(`/invoices/${result[0].id}`);
}



export async function updateStatusAction(formData:FormData){
const {userId}  =auth();
if(!userId){
  return;
}

const id = formData.get('id') as string;
const status = formData.get("status_id")as Status;
const results = await db.update(Invoice).set({status}).where(and(
  eq(Invoice.id,parseInt(id)),
  eq(Invoice.userId,userId)
))
revalidatePath(`/invoices/${id}`,'page')
console.log(results)
}

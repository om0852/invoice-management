"use server";

import { db } from "@/db";
import { Invoice } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
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

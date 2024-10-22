import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { Invoice } from "@/db/schema";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import InvoiceContainer from "./invoice";

const Page = async ({ params }: { params: { invoiceId: string } }) => {
  const { invoiceId } = params;
  const parsedInvoiceId = parseInt(invoiceId);
  const { userId } = auth();

  if (!userId) return;
  if (isNaN(parsedInvoiceId)) {
    throw new Error("Invalid Invoice id");
  }
  const [result] = await db
    .select()
    .from(Invoice)
    .where(and(eq(Invoice.id, invoiceId), eq(Invoice.userId, userId)))
    .limit(1);
  if (!result) notFound();
return <InvoiceContainer invoice={result}/>
};

export default Page;

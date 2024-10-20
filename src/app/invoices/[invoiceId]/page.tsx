import React, { startTransition, SyntheticEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { createAction } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { Invoice } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Page = async ({ params }: { params: { invoiceId: string } }) => {
  const { invoiceId } = await params;
  const parsedInvoiceId = parseInt(invoiceId);

  const [result] = await db
    .select()
    .from(Invoice)
    .where(eq(Invoice.id, invoiceId))
    .limit(1);
  return (
    <>
      <main className="flex  flex-col justify-center h-full  gap-6 max-w-5xl mx-auto my-12">
        {" "}
        <div className="flex justify-between">
          <h1 className="text-3xl flex gap-4 items-center font-semibold">
            Invoice {parsedInvoiceId}
            <Badge className={cn("rounded-full capitalize py-1 px-4",
                result.status==='open' && "bg-blue-500",
                result.status==='paid' && "bg-green-600",
                result.status==='void' && "bg-zinc-700",
                result.status==='uncollectible' && "bg-red-600"
                
                )}>
                {result.status}
            </Badge>
          </h1>
        </div>
        <h1 className="text-3xl">${(result.value / 100).toFixed(2)}</h1>
        <p className="text-3xl mb-3"></p>
        <p className="text-lg mb-8"></p>
        <h2 className="font-bold text-lg mb-0">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Id
            </strong>
            <span>{invoiceId}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Data
            </strong>
            <span>{new Date(result.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Page;

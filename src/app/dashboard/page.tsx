import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { Invoice } from "@/db/schema";
import { cn } from "@/lib/utils";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const results = await db.select().from(Invoice);
  return (
    <main className="flex  flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      {" "}
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p>
          <Button className="inline-flex gap-2" variant="ghost" asChild>
            <Link href={"/invoices/new"}>
              <BadgePlus className=" h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A List of your recent invoice</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell className="text-left font-medium p-0 ">
                <Link
                  href={`/invoices/${result.id}`}
                  className="font-semibold block p-4"
                >
                  {new Date(result.createTs).toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="text-left p-0 ">
                <Link
                  href={`/invoices/${result.id}`}
                  className="font-semibold block p-4"
                >
                  om salunke
                </Link>
              </TableCell>
              <TableCell className="text-left p-0 ">
                <Link href={`/invoices/${result.id}`} className="p-4 block">
                  om salunke
                </Link>
              </TableCell>
              <TableCell className="text-center p-0 ">
                <Link
                  href={`/invoices/${result.id}`}
                  className="font-semibold block "
                >
                   <Badge className={cn("rounded-full capitalize py-1 px-4",
                result.status==='open' && "bg-blue-500",
                result.status==='paid' && "bg-green-600",
                result.status==='void' && "bg-zinc-700",
                result.status==='uncollectible' && "bg-red-600"
                
                )}>
                {result.status}
            </Badge>
                </Link>
              </TableCell>
              <TableCell className="text-right p-0 ">
                <Link
                  href={`/invoices/${result.id}`}
                  className="font-semibold p-4"
                >
                  ${(result.value / 100).toFixed(2)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default Page;

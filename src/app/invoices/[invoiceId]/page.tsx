import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { Invoice } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Container from "@/components/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { status } from "@/data/invoices";
import { updateStatusAction } from "@/app/actions";
import { ChevronDown } from "lucide-react";

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
  return (
    <>
      <main className="flex  flex-col justify-start h-full  gap-6">
        {" "}
        <Container className="">
          <div className="flex justify-between w-[130vh] items-center">
            <h1 className="text-3xl flex gap-4 items-center font-semibold">
              Invoice {parsedInvoiceId}
              <Badge
                className={cn(
                  "rounded-full capitalize py-1 px-4",
                  result.status === "open" && "bg-blue-500",
                  result.status === "paid" && "bg-green-600",
                  result.status === "void" && "bg-zinc-700",
                  result.status === "uncollectible" && "bg-red-600"
                )}
              >
                {result.status}
              </Badge>
            </h1>
            <p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center justify-around
                  " variant={"outline"}>Change Status
                    <ChevronDown className="W-4 h-auto "/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {status.map((item) => (
                    <DropdownMenuItem id={item.id} key={item.id}>
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={invoiceId}/>
                        <input type="hidden" name="status_id" value={item.id}/>
                        <button>{item.label}</button>
                      </form>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </p>
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
        </Container>
      </main>
    </>
  );
};

export default Page;

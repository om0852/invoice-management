// "use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sql } from "drizzle-orm";
import { db } from "@/db";
const Page = async() => {
  const result  = await db.execute(sql`SELECT current_database()`);
  console.log(result)
  return (
    <>
      <main className="flex  flex-col justify-center h-full  gap-6 max-w-5xl mx-auto my-12">
        {" "}
        
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Create Invoices</h1>
        </div>
        <form className="grid gap-4 max-w-xs">
          <div>
            <div>
              <Label htmlFor="name">Billing Name</Label>
              <Input name="name" id="name" type="text" />
            </div>
            <div>
              <Label htmlFor="email">Billing Email</Label>
              <Input name="email" id="email" type="text" />
            </div>
            <div>
              <Label htmlFor="value">Value</Label>
              <Input name="value" id="value" type="text" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description"></Textarea>
            </div>
            <div className="mt-4">
              <Button className="w-full font-semibold">Submit</Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Page;

"use client";
import React, { startTransition, SyntheticEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAction } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
const Page = () => {
  const [state, setState] = useState("ready");
  const handleOnSubmit = async(event:SyntheticEvent) => {
    event.preventDefault();
    if (state === "pending") return;
    setState("pending");
    const target = event.target as HTMLFormElement;
    startTransition(async()=>{
      const formData = new FormData(target);
      await createAction(formData);
    })
    
  };
  return (
    <>
      <main className="flex  flex-col justify-center h-full  gap-6 max-w-5xl mx-auto my-12">
        {" "}
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Create Invoices</h1>
        </div>
        <form 
          action={createAction}
          onSubmit={handleOnSubmit}
          className="grid gap-4 max-w-xs"
        >
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
              <SubmitButton/>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Page;

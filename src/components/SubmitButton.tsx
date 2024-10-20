"use client"
import { useFormStatus } from "react-dom";
import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = () => {
    const {pending} = useFormStatus();
  return (
    <>
      <Button disabled={pending} className="w-full font-semibold relative "><span className={pending ? "text-transparent":""}>Submit</span>
      {pending &&(
        <span className="text-gray-400 flex items-center justify-center w-full h-full absolute">
            <LoaderCircle className="animate-spin" />
        </span>
      )}
      </Button>
    </>
  );
};

export default SubmitButton;

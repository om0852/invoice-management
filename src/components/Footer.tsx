import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Container from "./Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-6 mb-8">
      <Container className="flex justify-between gap-4">
        <p>InvoiceManager &copy; {new Date().getFullYear()}</p>
        <p>Created by om salunke</p>
      </Container>
    </footer>
  );
};

export default Footer;

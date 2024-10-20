import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Container from "@/components/Container";
export default async function Home() {
  // Now you can use headersList safely

  return (
    <main className="flex flex-col justify-center h-[100vh] text-center gap-6 items-center max-w-5xl mx-auto">
      <Container>
        <h1 className="text-5xl font-bold">Invoice Manager</h1>
        <p></p>
      </Container>
    </main>
  );
}

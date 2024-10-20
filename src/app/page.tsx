import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { headers } from 'next/headers'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default async function Home() {
  const headersList = await headers()
  // Now you can use headersList safely
  
  return <main className="flex flex-col justify-center h-[100vh] text-center gap-6 items-center max-w-5xl mx-auto">
  <h1 className="text-5xl font-bold">Invoice Manager</h1>
  <p>
    <SignedOut>
      <SignInButton/>
    </SignedOut>
<SignedIn>
  <UserButton/>
</SignedIn>
    <Button asChild>

    <Link href="/dashboard">Sign In</Link>
    </Button>
  </p>
  </main>;
}

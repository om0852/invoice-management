'use client';

import { ClerkProvider } from "@clerk/nextjs";

export default function ClientLayout({ 
  children,
  headersList
}: { 
  children: React.ReactNode,
  headersList: any
}) {
  return (
    <ClerkProvider>{children}</ClerkProvider>
  );
}
import React from "react";
import type { Metadata } from 'next'
import '@/app/globals.css'
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Toaster />
      {children}
    </main>
  );
};

export default layout;
import React from "react";
import '@/app/globals.css';
import { Toaster } from "@/components/ui/toast";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (<main>
    <Toaster/>
    {children}
  </main>);
};

export default layout;
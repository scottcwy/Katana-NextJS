import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import { Sidebar as SidebarType } from "@/types/blocks/sidebar";

export default async function DashboardLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: SidebarType;
}) {
  return (
    <SidebarProvider>
      {sidebar && <Sidebar sidebar={sidebar} />}
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

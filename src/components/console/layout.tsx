import { ReactNode } from "react";
import { Sidebar } from "@/types/blocks/sidebar";
import SidebarNav from "@/components/console/sidebar/nav";

export default async function ConsoleLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: Sidebar;
}) {
  return (
    <div className="container md:max-w-7xl py-8 mx-auto">
      <div className="w-full space-y-6 p-4 pb-16 block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          {sidebar?.nav?.items && (
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebar.nav?.items} />
            </aside>
          )}
          <div className="flex-1 lg:max-w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

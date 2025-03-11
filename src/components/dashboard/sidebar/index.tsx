import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";
import { Sidebar as SidebarType } from "@/types/blocks/sidebar";
import User from "./user";

export default function ({ sidebar }: { sidebar: SidebarType }) {
  if (sidebar.disabled) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      {sidebar?.brand && (
        <SidebarHeader>
          <Header brand={sidebar.brand} />
        </SidebarHeader>
      )}

      <SidebarContent>
        {sidebar?.nav && <Nav nav={sidebar.nav} />}
        {sidebar?.library && sidebar.library}
      </SidebarContent>
      <SidebarFooter>
        <User />
        {sidebar?.social && <Footer social={sidebar.social} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

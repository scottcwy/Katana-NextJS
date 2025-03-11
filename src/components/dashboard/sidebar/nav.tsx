"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavItem, Nav as NavType } from "@/types/blocks/base";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { ChevronRight } from "lucide-react";
import Icon from "@/components/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ({ nav }: { nav: NavType }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Features</SidebarGroupLabel> */}
      <SidebarMenu>
        {nav.items?.map((item: NavItem) =>
          item.children ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.is_expand}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <Icon name={item.icon} className="text-xl" />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children?.map((subItem: NavItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={`${
                            subItem.is_active ? "text-primary" : ""
                          }`}
                        >
                          <Link
                            href={subItem.url || ""}
                            className="flex items-center gap-1"
                          >
                            {subItem.icon && (
                              <Icon name={subItem.icon} className="text-xl" />
                            )}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`${item.is_active ? "text-primary" : ""}`}
              >
                <Link href={item.url || ""} className="flex items-center gap-1">
                  {item.icon && <Icon name={item.icon} className="text-xl" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

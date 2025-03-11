"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { Brand as BrandType } from "@/types/blocks/base";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function ({ brand }: { brand: BrandType }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <Link
            href={brand?.url || "javascript:void(0)"}
            className="flex items-center gap-1 py-2"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <img
                src={brand?.logo?.src}
                alt={brand?.logo?.alt || brand?.title}
                className="size-6"
              />
            </div>
            <div className="grid flex-1 text-left text-lg leading-tight">
              <span className="truncate font-medium">{brand?.title}</span>
            </div>
            {/* {open && <SidebarTrigger />} */}
          </Link>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

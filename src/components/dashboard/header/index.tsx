import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Crumb } from "@/types/blocks/base";
import { Fragment } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ({ crumb }: { crumb?: Crumb }) {
  return (
    <header className="flex py-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        {crumb && crumb.items && crumb.items.length > 0 && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {crumb.items.map((item, index) => {
                  if (item.is_active) {
                    return (
                      <BreadcrumbItem key={index}>
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    );
                  }

                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem className="hidden md:block">
                        <Link
                          href={item.url || ""}
                          className="hover:text-primary"
                        >
                          {item.title}
                        </Link>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}
      </div>
    </header>
  );
}

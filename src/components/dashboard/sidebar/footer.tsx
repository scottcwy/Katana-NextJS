"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import Icon from "@/components/icon";
import Link from "next/link";
import { Social as SocialType } from "@/types/blocks/base";

export default function ({ social }: { social: SocialType }) {
  const { open } = useSidebar();

  const handleTabChange = (value: string) => {
    console.log(value);
  };

  return (
    <>
      {open ? (
        <div className="w-full flex items-center justify-center mx-auto gap-x-4 px-4 py-4 border-t border-gray-200">
          {social?.items?.map((item, idx: number) => (
            <div className="cursor-pointer hover:text-primary" key={idx}>
              <Link href={item.url || ""} target={item.target || "_self"}>
                {item.icon && <Icon name={item.icon} className="text-xl" />}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

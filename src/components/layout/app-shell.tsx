"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import SignModal from "@/components/sign/modal";

/**
 * u5e94u7528u5916u58f3u7ec4u4ef6
 * u96c6u6210u5168u5c40UIu7ec4u4ef6uff0cu5982u901au77e5u3001u767bu5f55u6a21u6001u6846
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      {/* u5168u5c40UIu7ec4u4ef6 */}
      <Toaster position="top-center" richColors />
      <SignModal />
    </>
  );
}

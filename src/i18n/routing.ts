import {
  defaultLocale,
  localeDetection,
  localePrefix,
  locales,
  pathnames,
} from "./locale";

import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  pathnames,
  localeDetection,
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);

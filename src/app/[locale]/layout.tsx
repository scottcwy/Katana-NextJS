import "@/app/globals.css";

import { getMessages, getTranslations } from "next-intl/server";

import { AppContextProvider } from "@/contexts/app";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import { NextAuthSessionProvider } from "@/auth/session";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/contexts/theme";
import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: {
      template: `%s | ${t("metadata.title")}`,
      default: t("metadata.title") || "",
    },
    description: t("metadata.description") || "",
    keywords: t("metadata.keywords") || "",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16" },
        { url: "/favicon-32x32.png", sizes: "32x32" }
      ],
      apple: "/apple-icon.png",
      shortcut: "/shortcut-icon.png"
    },
    manifest: "/site.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  console.log('Current locale:', locale);
  console.log('Available messages:', Object.keys(messages));

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuthSessionProvider>
        <AppContextProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <AppShell>
              <div
                className={cn(
                  "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
                  fontSans.variable
                )}
              >
                {children}
              </div>
            </AppShell>
          </ThemeProvider>
        </AppContextProvider>
      </NextAuthSessionProvider>
    </NextIntlClientProvider>
  );
}

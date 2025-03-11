import React from "react";
import { getLandingPage } from "@/services/page";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import dynamic from 'next/dynamic';

const SharedBackground = dynamic(() => import('@/components/ui/shared-background'), {
  ssr: false
});

export default async function BlogLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const page = await getLandingPage(locale);

  return (
    <>
      <SharedBackground />
      {page.header && <Header header={page.header} />}
      <main className="relative overflow-x-hidden">{children}</main>
      {page.footer && <Footer footer={page.footer} />}
    </>
  );
}

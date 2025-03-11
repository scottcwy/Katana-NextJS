import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";
import { ReactNode } from "react";
import { getLandingPage } from "@/services/page";
import dynamic from 'next/dynamic';

const SharedBackground = dynamic(() => import('@/components/ui/shared-background'), {
  ssr: false
});

export default async function DefaultLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
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

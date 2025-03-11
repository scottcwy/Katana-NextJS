import Hero from "@/components/blocks/hero";
import { getLandingPage } from "@/services/page";
import dynamic from 'next/dynamic';

const Generator = dynamic(() => import('@/components/image/ImageGenerator').then(mod => mod.ImageGenerator), {
  ssr: false
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}`;
  }

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function LandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // 
  // const page = await getLandingPage(locale);

  return (
    <>
      <Hero />
      <Generator />
    </>
  );
}
import { Footer as FooterType } from "@/types/blocks/footer";
import { useTranslations } from "next-intl";

export default function Footer({ footer }: { footer: FooterType }) {
  const t = useTranslations("footer");
  
  if (footer.disabled) {
    return null;
  }

  return (
    <section id={footer.name} className="py-6 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-8">
        <footer className="text-neutral-300">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex w-full flex-col items-center justify-center gap-3">
              {footer.brand && (
                <div>
                  <div className="flex items-center justify-center gap-2">
                    {footer.brand.logo && (
                      <img
                        src={footer.brand.logo.src}
                        alt={footer.brand.logo.alt || footer.brand.title}
                        className="h-10"
                      />
                    )}
                    {footer.brand.title && (
                      <p className="text-2xl font-semibold text-white">
                        {footer.brand.title}
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-neutral-400">
                    {t('description')}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-5 border-t border-neutral-700 pt-4 text-center text-xs text-neutral-500">
            <p>{t('copyright')}</p>
          </div>
        </footer>
      </div>
    </section>
  );
}

"use client";

import { Footer as FooterType } from "@/types/blocks/footer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Footer({ footer }: { footer: FooterType }) {
  const t = useTranslations("footer");
  
  if (footer.disabled) {
    return null;
  }

  return (
    <motion.section 
      id={footer.name} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-6 bg-transparent border-t border-white/5 relative z-40"
    >
      <div className="max-w-7xl mx-auto px-8">
        <footer className="text-primary">
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
                      <p className="text-2xl font-semibold text-white text-shadow">
                        {footer.brand.title}
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-white/80 text-shadow-sm">
                    {t('description')}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-5 pt-4 text-center text-xs border-t border-white/5">
            <p className="text-white/70 text-shadow-sm">{t('copyright')}</p>
          </div>
        </footer>
      </div>
    </motion.section>
  );
}

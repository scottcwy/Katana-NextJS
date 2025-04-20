"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const t = useTranslations();
  const { setShowSignModal } = useAppContext();

  return (
    <Button
      variant="default"
      className="bg-primary dark:bg-accent text-primary-foreground dark:text-accent-foreground border-none transition-colors"
      onClick={() => setShowSignModal(true)}
    >
      {t("user.sign_in")}
    </Button>
  );
}

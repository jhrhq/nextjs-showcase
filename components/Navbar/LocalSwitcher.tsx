"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaLanguage } from "react-icons/fa6";

const LocalSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const otherLocale = locale === "en" ? "bn" : "en";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChangeLanguage() {
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      router.replace(pathname, { locale: locale === "en" ? "bn" : "en" });
    });
  }

  return (
    <Button
      onClick={handleChangeLanguage}
      disabled={isPending}
      value={otherLocale}
    >
      <FaLanguage className="fas fa-language text-zinc-700 text-xl" />
      {/* {t("switchLocale", { locale: otherLocale })} */}
    </Button>
  );
};

export default LocalSwitcher;

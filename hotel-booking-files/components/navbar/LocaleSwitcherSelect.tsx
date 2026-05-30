"use client";

import { Toggle } from "@/components/ui/toggle";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams, useSearchParams } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { FaLanguage } from "react-icons/fa6";

type Props = {
  children?: ReactNode;
  defaultValue: string;
  label?: string;
};

export default function LocaleSwitcherSelect({ defaultValue }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const query = Object.fromEntries(searchParams.entries());

  function onSelectChange() {
    const nextLocale = defaultValue === "en" ? "bn" : "en";
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params, query },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Toggle
      aria-label="Toggle language"
      disabled={isPending}
      defaultPressed={defaultValue == "bn"}
      onPressedChange={onSelectChange}
      className="text-zinc-700"
    >
      <FaLanguage className="fas fa-language  text-xl" />
    </Toggle>
  );
}

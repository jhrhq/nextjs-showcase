"use client";

import { useParams, useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocaleSwitcherSelect = ({
  defaultValue,

  children,
}: {
  defaultValue?: string;

  children?: ReactNode;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = useParams();

  function handleChangeLanguage() {
    // const nextLocal = event.target.value;
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      router.replace({ pathname, params }, { locale: nextLocal });
    });
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChangeLanguage}>
      <SelectTrigger className="w-[180px]" disabled={isPending}>
        <SelectValue placeholder="Select a fruit" />

        {/* <FaLanguage className="fas fa-language text-zinc-700 text-xl" /> */}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcherSelect;

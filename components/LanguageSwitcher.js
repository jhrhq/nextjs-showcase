"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LanguageSwitcher = () => {
  const languages = [
    {
      code: "en",
      language: "English",
    },
    {
      code: "bn",
      language: "Bangla",
    },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const found = languages.find((lang) => pathname.includes(lang.code));
  const [selectedLanguage, setSelectedLanguage] = useState(
    found ?? languages[0]
  );

  const handleLanguageChange = (lang) => {
    const editedPath = pathname.split("/").filter(Boolean).slice(1).join("/");
    let path = pathname;
    if (pathname.includes(selectedLanguage.code)) {
      path = pathname.replace(selectedLanguage.code, lang);
    }
    setSelectedLanguage({
      ...selectedLanguage,
      code: lang,
      language: lang === "en" ? "English" : "Bangla",
    });

    router.push(`/${lang}/${editedPath}`);
  };

  return (
    <Select onValueChange={handleLanguageChange} value={found.code}>
      <SelectTrigger className="w-[120px] bg-transparent border-gray-500 ">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 text-white">
        {languages.map((entry) => (
          <SelectItem key={entry.language} value={entry.code}>
            {entry.language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;

"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Goback = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
    >
      <MoveLeft className="w-5 h-5 rtl:rotate-180" />
      <span>Go back</span>
    </button>
  );
};

export default Goback;

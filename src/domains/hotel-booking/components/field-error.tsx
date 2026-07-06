import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";


const FieldCustomError = ({ errorMessage, className }: { errorMessage?: string; className?: string }) => {
  if (!errorMessage) return null;

  return (
    <div className={cn("flex dark:bg-gray-900 rounded-3xl items-center px-6 py-4 text-sm bg-red-100", className)}>
      <CircleAlert className="size-4 text-red-500 stroke-current shrink-0" />
      <div className="ml-3">
        <div className=" text-left text-red-600 dark:text-gray-50">{errorMessage}</div>
        {/* <div className="w-full text-gray-900 dark:text-gray-300 mt-1">You don&#x27;t have access to this page.</div> */}
      </div>
    </div>
  );
};

export { FieldCustomError };

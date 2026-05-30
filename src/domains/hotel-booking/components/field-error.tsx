import { cn } from "@/lib/utils";
import type { FormState } from "@/domains/hotel-booking/utils/form-error-state";
import { FaCircleExclamation } from "react-icons/fa6";

type FieldErrorProps = {
  formState: FormState;
  name: string;
  className?: string;
};

const FieldError = ({ formState, name, className }: FieldErrorProps) => {
  if (!name || !formState?.fieldErrors[name]?.[0]) return null;

  return (
    <div>
      <span className={cn("text-xs text-red-400", className)}>{formState.fieldErrors[name]?.[0]}</span>
    </div>
  );
};
const FieldCustomError = ({ errorMessage, className }: { errorMessage?: string; className?: string }) => {
  if (!errorMessage) return null;

  return (
    <div className={cn("flex dark:bg-gray-900 rounded-3xl items-center px-6 py-4 text-sm bg-red-100", className)}>
      <FaCircleExclamation
        className="size-4 text-red-500 stroke-current shrink-0"
        // fill="none"
      />
      <div className="ml-3">
        <div className=" text-left text-red-600 dark:text-gray-50">{errorMessage}</div>
        {/* <div className="w-full text-gray-900 dark:text-gray-300 mt-1">You don&#x27;t have access to this page.</div> */}
      </div>
    </div>
  );
};

export { FieldCustomError, FieldError };

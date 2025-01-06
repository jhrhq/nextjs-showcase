import { cn } from "@/lib/utils";
import { FormState } from "@/utils/form-error-state";

type FieldErrorProps = {
  formState: FormState;
  name: string;
  className?: string;
};

const FieldError = ({ formState, name, className }: FieldErrorProps) => {
  return (
    <div>
      <span className={cn("text-xs text-red-400", className)}>
        {formState.fieldErrors[name]?.[0]}
      </span>
    </div>
  );
};

export { FieldError };

import { checkPasswordStrength } from "@/app/password-meter/utils";
import { cn } from "@/lib/utils";

const PasswordValidationMeter = ({ password }: { password?: string }) => {
  if (!password) return null;
  const { score } = checkPasswordStrength(password);

  return (
    <div className="space-y-1">
      <div className="h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={cn(
            "h-full  rounded transition-all duration-300",

            score < 3
              ? "bg-destructive"
              : score < 5
                ? "bg-orange-400"
                : "bg-emerald-500",
          )}
          style={{
            width: `${score * 20}%`,
          }}
        />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Strength:
        <span
          className={cn(
            "ml-1 font-medium",
            score < 3
              ? "text-destructive"
              : score < 5
                ? "text-warning"
                : "text-success",
          )}
        >
          {score < 3 ? "Weak" : score < 5 ? "Average" : "Strong"}
        </span>
      </p>
    </div>
  );
};

export default PasswordValidationMeter;

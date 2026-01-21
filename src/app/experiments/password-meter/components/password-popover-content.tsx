import range from "lodash.range";
import { LucideDot } from "lucide-react";
import type { ReactNode } from "react";
import { CustomProgress } from "@/app/password-meter/components/custom-progress";
import { checkPasswordStrength } from "@/app/password-meter/utils";
import { cn } from "@/lib/utils";

const progressObj = {
  Weak: "bg-orange-400/80",
  Average: "bg-amber-300",
  Good: "bg-emerald-500",
  Strong: "bg-emerald-500",
  "": "bg-gray-300",
};

const PasswordPopoverContent = (props: { value: string }) => {
  const { score, strength, hasLowercase, hasNumber, hasUppercase, hasSymbol } = checkPasswordStrength(props.value);
  const progressRange: number[] = range(1, 5);
  return (
    <>
      <h4 className="text-base font-medium text-gray-950 dark:text-white">
        {strength || "Must have at least 6 characters."} {strength && "Password"}
      </h4>
      <div className="mb-5 mt-4 flex gap-2">
        {progressRange.map((item, index) => {
          const progressBarBg = index < score && progressObj[strength];
          return (
            <CustomProgress
              key={item}
              value={100}
              className="h-0.5 w-20 rounded-full"
              indicatorClassName={cn("bg-gray-300", progressBarBg)}
            />
          );
        })}
      </div>

      <div className="space-y-2 text-base font-normal text-gray-700 dark:text-gray-200 ">
        <p>It's better to have:</p>

        <div className="flex flex-col gap-y-2">
          <CheckList isChecked={hasUppercase && hasLowercase}>Upper & lower case letters</CheckList>
          <CheckList isChecked={hasSymbol}>A symbol (#$&)</CheckList>
          <CheckList isChecked={hasNumber}>A number</CheckList>
          <CheckList isChecked={props.value.length >= 16}>A longer password</CheckList>
        </div>
      </div>
    </>
  );
};

export default PasswordPopoverContent;

const CircleCheckSvg = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        " mr-2 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-500 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500",
        className
      )}
    >
      <svg
        className="size-2 shrink-0 text-blue-50"
        xmlns="http://www.w3.org/2000/svg"
        // width="24"
        // height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title className="sr-only">Circle Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
};

const CheckList = ({ isChecked, children }: { isChecked: boolean; children: ReactNode }) => {
  return (
    <div
      className={cn(
        "flex w-full font-normal shrink-0 items-center transition-all",
        isChecked && "text-gray-300 line-through"
      )}
    >
      {isChecked ? (
        <CircleCheckSvg />
      ) : (
        <span className={cn("mr-2 flex size-4 shrink-0 items-center justify-center ")}>
          <LucideDot className=" size-6 shrink-0 stroke-[3px] text-blue-600" />
        </span>
      )}
      {children}
    </div>
  );
};

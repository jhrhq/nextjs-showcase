import range from "lodash.range";
// import { LucideDot } from "lucide-react";
import type { Key } from "react";
import { CustomProgress } from "@/app/password-meter/components/custom-progress";
import { checkPasswordStrength } from "@/app/password-meter/utils";
import { cn } from "@/lib/utils";

const progressObj = {
  weak: "bg-orange-400",
  average: "bg-yellow-500",
  good: "bg-primary",
  strong: "bg-primary",
  "": "bg-gray-300",
};

const PasswordPopoverContent = (props: { value: string }) => {
  const { strength } = checkPasswordStrength(props.value);
  const progressRange = range(1, 5);
  return (
    <div>
      <h4 className="text-base font-medium text-gray-950 dark:text-white">
        {strength || "Must have at least 6 characters."}{" "}
        {strength && "Password"}
      </h4>
      <div className="mb-5 mt-4 flex gap-2">
        {progressRange.map((item: Key | null | undefined) => {
          const progressBarBg = progressObj[strength];
          return (
            <CustomProgress
              key={item}
              value={100}
              className="h-0.5 w-20 rounded-full"
              indicatorClassName={cn("bg-gray-300", progressBarBg)}
            />
          );
        })}
        {/* <CustomProgress
          value={strength.length ? 100 : 0}
          className="h-0.5 w-20 rounded-full bg-zinc-300"
          indicatorClassName={cn("bg-background", progressColor)}
        />
        <CustomProgress
          value={
            (strength.length && strength.lowercase) ||
            strength.uppercase ||
            strength.number ||
            strength.symbol
              ? 100
              : 0
          }
          className="h-0.5 w-20 rounded-full bg-zinc-300"
          indicatorClassName={cn("bg-background", progressColor)}
        />
        <CustomProgress
          value={
            strength.length &&
            strength.lowercase &&
            strength.uppercase &&
            strength.number &&
            strength.symbol
              ? 100
              : strength.length &&
                  strength.lowercase &&
                  strength.uppercase &&
                  strength.number
                ? 50
                : strength.length &&
                    strength.lowercase &&
                    strength.uppercase &&
                    strength.symbol
                  ? 50
                  : strength.length &&
                      strength.lowercase &&
                      strength.symbol &&
                      strength.number
                    ? 50
                    : 0
          }
          className="h-0.5 w-20 rounded-full bg-zinc-300"
          indicatorClassName={cn("bg-background", progressColor)}
        />
        <CustomProgress
          value={strength.score === 6 ? 100 : 0}
          className="h-0.5 w-20 rounded-full bg-zinc-300"
          indicatorClassName={cn("bg-background", progressColor)}
        /> */}
      </div>

      <div className="space-y-2 text-base font-normal text-gray-700 dark:text-gray-200 ">
        <p>It's better to have:</p>

        {/* <div className="flex flex-col gap-y-2">
          <CheckList isChecked={strength.uppercase && strength.lowercase}>
            Upper & lower case letters
          </CheckList>
          <CheckList isChecked={strength.symbol}>A symbol (#$&)</CheckList>
          <CheckList isChecked={strength.number}>A number</CheckList>
          <CheckList isChecked={strength.eightcharacters}>
            A longer password (at least 8 characters){" "}
          </CheckList>
        </div> */}
      </div>
    </div>
  );
};

export default PasswordPopoverContent;

/* const CircleCheckSvg = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        " mr-2 flex size-5 shrink-0  items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500",
        className,
      )}
    >
      <svg
        className="size-3  shrink-0"
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
 */
/* const CheckList = ({
  isChecked,
  children,
}: {
  isChecked: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex w-full shrink-0 items-center transition-all",
        isChecked && "text-gray-300 line-through",
      )}
    >
      {isChecked ? (
        <CircleCheckSvg />
      ) : (
        <LucideDot className="mr-1 size-6 shrink-0 stroke-[3px] text-blue-600" />
      )}
      {children}
    </div>
  );
};
 */

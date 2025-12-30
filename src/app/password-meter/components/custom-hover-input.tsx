import { LucideDot } from "lucide-react";
import type { ReactNode } from "react";
import {
  CustomHoverCard,
  CustomHoverCardArrow,
  CustomHoverCardContent,
  CustomHoverCardTrigger,
} from "@/app/password-meter/components/custom-hover-card";
import { CustomProgress } from "@/app/password-meter/components/custom-progress";
import { checkPasswordStrength } from "@/app/password-meter/utils";
import { cn } from "@/lib/utils";

const HoverCardDemo = (props) => {
  const { score, hasUppercase, hasLowercase, hasNumber, hasSymbol } =
    checkPasswordStrength(props?.value);

  return (
    <CustomHoverCard>
      <CustomHoverCardTrigger asChild>{props.children}</CustomHoverCardTrigger>
      <CustomHoverCardContent
        className="data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade w-72 rounded-lg bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
        sideOffset={5}
        side="left"
      >
        <h4 className="text-base font-medium text-gray-950">
          Must have at least 6 characters.
        </h4>
        <div className="mb-5 mt-4 flex gap-2">
          <CustomProgress
            value={props.value && props.value?.length >= 6 ? 100 : 0}
            className="h-0.5 w-20 rounded-full bg-zinc-300"
            indicatorClassName={cn(
              score >= 5
                ? "bg-emerald-500"
                : props.value && props.value?.length >= 6
                  ? "bg-amber-400"
                  : "bg-background",
            )}
          />
          <CustomProgress
            value={score >= 3 ? 100 : 0}
            className="h-0.5 w-20 rounded-full bg-zinc-300"
            indicatorClassName={cn(
              score >= 5
                ? "bg-emerald-500"
                : score >= 3
                  ? "bg-amber-400"
                  : "bg-background",
            )}
          />
          <CustomProgress
            value={score >= 4 ? 100 : 0}
            className="h-0.5 w-20 rounded-full bg-zinc-300"
            indicatorClassName={cn(
              score >= 5
                ? "bg-emerald-500"
                : score >= 4
                  ? "bg-amber-400"
                  : "bg-background",
            )}
          />
          <CustomProgress
            value={score >= 5 ? 100 : 0}
            className="h-0.5 w-20 rounded-full bg-zinc-300"
            indicatorClassName={cn(
              score >= 5 ? "bg-emerald-500" : "bg-background",
            )}
          />
        </div>

        <div className="space-y-2 text-base font-normal text-gray-700 ">
          <p>It's better to have:</p>

          <div className="flex flex-col gap-y-2">
            {/* condition not checked yet */}
            {/* <div className="flex w-full items-center transition-all ">
                  <LuDot className="stroke-[3px] size-6  text-blue-600 mr-1" />
                  Upper & lower case letters
                </div> */}
            <CheckList isChecked={hasUppercase && hasLowercase}>
              Upper & lower case letters
            </CheckList>
            <CheckList isChecked={hasSymbol}>A symbol (#$&)</CheckList>
            <CheckList isChecked={hasNumber}>A number</CheckList>
            <CheckList isChecked={score >= 5}>
              A longer password (at least 8 characters){" "}
            </CheckList>
          </div>
        </div>

        <CustomHoverCardArrow className="fill-white" />
      </CustomHoverCardContent>
    </CustomHoverCard>
  );
};

export default HoverCardDemo;

const CircleCheckSvg = () => {
  return (
    <span className=" mr-2 flex size-5  items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
      <svg
        className="size-3 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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

const CheckList = ({
  isChecked,
  children,
}: {
  isChecked: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center transition-all ",
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

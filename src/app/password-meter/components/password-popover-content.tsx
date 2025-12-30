import { LucideDot } from "lucide-react";
import type { ReactNode } from "react";
import { CustomProgress } from "@/app/password-meter/components/custom-progress";
import { cn } from "@/lib/utils";

type PasswordCriteria = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  symbol: boolean;
  eightcharacters: boolean;
  score: number;
};

// eslint-disable-next-line react-refresh/only-export-components
export function evaluatePasswordStrength(password) {
  const minLength = 6;
  const strongLength = 8;

  const hasNumber = /[0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const isLongEnough = password.length >= minLength;

  // Check for strength based on length and character types

  if (!password) {
    return "";
  }
  if (
    password.length >= strongLength &&
    hasNumber &&
    hasUppercase &&
    hasSpecialChar
  ) {
    return "Strong";
  }

  if (isLongEnough && hasNumber && hasUppercase && hasSpecialChar) {
    return "Good";
  }

  if (isLongEnough && (hasNumber || hasUppercase || hasSpecialChar)) {
    return "Average";
  }

  return "Weak";
}

// eslint-disable-next-line react-refresh/only-export-components
export function calculatePasswordStrength(password: string): PasswordCriteria {
  const strength = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    eightcharacters: false,
    score: 0, // Initialize score to 0
  };

  if (!password) strength;

  if (password.length >= 6) {
    strength.length = true;
    strength.score++;
  }

  if (/[a-z]/.test(password)) {
    strength.lowercase = true;
    strength.score++;
  } // checks for lowercase
  if (/[A-Z]/.test(password)) {
    strength.uppercase = true;
    strength.score++;
  } // check for uppercase
  if (/\d/.test(password)) {
    strength.number = true;
    strength.score++;
  } // check for any digit
  if (/[^a-zA-Z0-9]/.test(password)) {
    strength.symbol = true;
    strength.score++;
  } // check for any symbol that is not a number or string
  if (password.length >= 8) {
    strength.eightcharacters = true;
    strength.score++;
  }

  return strength;
}
// eslint-disable-next-line react-refresh/only-export-components
export const getPasswordMeterHeaderText = (value: PasswordCriteria): string => {
  let header = "Must have at least 6 characters.";

  if (value.length) {
    if (value.score === 6) {
      header = "Strong Password";
    } else if (
      (value.symbol && value.uppercase) ||
      (value.symbol && value.number) ||
      (value.uppercase && value.number)
    ) {
      header = "Average Password";
    } else if (value.symbol || value.uppercase || value.number) {
      header = "Good Password";
    } else {
      header = "Weak Password";
    }
  }

  return header;
};

const getProgressColor = (value: PasswordCriteria): string => {
  let progressColor = "";

  if (value.length) {
    if (value.score === 6) {
      progressColor = "bg-success";
    } else if (
      (value.symbol && value.uppercase) ||
      (value.symbol && value.number) ||
      (value.uppercase && value.number)
    ) {
      progressColor = "bg-success";
    } else if (value.symbol || value.uppercase || value.number) {
      progressColor = "bg-yellow-400";
    } else {
      progressColor = "bg-yellow-400";
    }
  }

  return progressColor;
};

const PasswordPopoverContent = (props: { value: string }) => {
  const strength = calculatePasswordStrength(props?.value);
  const header = getPasswordMeterHeaderText(strength);
  const progressColor = getProgressColor(strength);

  return (
    <div>
      <h4 className="text-base font-medium text-gray-950 dark:text-white">
        {header}
      </h4>
      <div className="mb-5 mt-4 flex gap-2">
        <CustomProgress
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
        />
      </div>

      <div className="space-y-2 text-base font-normal text-gray-700 dark:text-gray-200 ">
        <p>It's better to have:</p>

        <div className="flex flex-col gap-y-2">
          <CheckList isChecked={strength.uppercase && strength.lowercase}>
            Upper & lower case letters
          </CheckList>
          <CheckList isChecked={strength.symbol}>A symbol (#$&)</CheckList>
          <CheckList isChecked={strength.number}>A number</CheckList>
          <CheckList isChecked={strength.eightcharacters}>
            A longer password (at least 8 characters){" "}
          </CheckList>
        </div>
      </div>
    </div>
  );
};

export default PasswordPopoverContent;

const CircleCheckSvg = ({ className }: { className?: string }) => {
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

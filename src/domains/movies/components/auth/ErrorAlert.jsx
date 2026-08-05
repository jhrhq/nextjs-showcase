import { CirclePlus } from "lucide-react";

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="inline-flex w-full items-center gap-3 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3.5 mb-4 shadow-sm"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
        <CirclePlus className="w-3.5 h-3.5 rotate-45" />
      </span>
      <p className="text-sm font-medium text-destructive text-left leading-normal">{message}</p>
    </div>
  );
};

export default ErrorAlert;

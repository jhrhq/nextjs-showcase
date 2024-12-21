import { CirclePlus } from "lucide-react";

const ErrorAlert = ({ message }) => {
  if (!message) return;

  return (
    <div className="inline-flex rounded-lg bg-red-100 px-[18px] py-4 mb-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]">
      <p className="flex items-center text-sm font-medium text-[#BC1C21]">
        <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-red">
          <CirclePlus className="rotate-45" />
        </span>
        <span className="text-left">{message}</span>
      </p>
    </div>
  );
};

export default ErrorAlert;

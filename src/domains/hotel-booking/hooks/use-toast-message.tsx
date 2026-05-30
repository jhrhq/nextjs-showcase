// biome-ignore-all lint: ignoring linter rules
// biome-ignore-all format: ignoring formatting rulesimport { useRef, useEffect } from "react";
//
import type { FormState } from "@/domains/hotel-booking/utils/form-error-state";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const useToastMessage = (formState: FormState) => {
  const prevTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message && formState.timestamp !== prevTimestamp.current;

  useEffect(() => {
    if (showToast) {
      if (formState.status === "ERROR") {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
      }

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState, showToast]);

  // stay usable without JS
  return (
    <noscript>
      {formState.status === "ERROR" && (
        <div style={{ color: "red" }}>{formState.message}</div>
      )}

      {formState.status === "SUCCESS" && (
        <div style={{ color: "green" }}>{formState.message}</div>
      )}
    </noscript>
  );
};

export { useToastMessage };

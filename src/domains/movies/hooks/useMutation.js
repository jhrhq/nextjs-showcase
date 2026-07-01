import { useCallback, useState } from "react";

export function useMutation(url, fetcherFn) {
  const [isMutating, setIsMutating] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // useCallback ensures the trigger function reference doesn't change unexpectedly
  const trigger = useCallback(
    async (arg) => {
      setIsMutating(true);
      setError(null);
      try {
        const result = await fetcherFn(url, { arg });
        setData(result);
        return result; // Returns data just like useSWRMutation does
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setIsMutating(false);
      }
    },
    [url, fetcherFn]
  );

  return { trigger, isMutating, data, error };
}

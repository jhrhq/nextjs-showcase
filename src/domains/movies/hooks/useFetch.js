import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If url is null or a function returning null, don't fetch (Conditional fetching)
    const targetUrl = typeof url === "function" ? url() : url;
    if (!targetUrl) {
      setData(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setData(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    // Cleanup to prevent memory leaks / race conditions
    return () => {
      isMounted = false;
    };
  }, [typeof url === "function" ? url() : url]); // Re-run when the URL changes

  return { data, isLoading, error };
}

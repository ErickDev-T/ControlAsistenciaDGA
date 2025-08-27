import { useEffect, useState } from "react";
import { getApplications } from "../services/applications";

export function useApplications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    getApplications(ctrl.signal)
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || String(err));
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  return { data, loading, error };
}

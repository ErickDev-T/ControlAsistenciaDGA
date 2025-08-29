import { useEffect, useState, useCallback } from "react";
import { getApplications, deleteApplication } from "../services/applications";

export function useApplications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    const ctrl = new AbortController();
    getApplications(ctrl.signal)
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || String(err));
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    const abort = load();
    return () => abort?.();
  }, [load]);

  const removeById = useCallback((id) => {
    setData((prev) => prev.filter((r) => r.id !== id && r.Id !== id));
  }, []);

  const remove = useCallback(async (id) => {
    await deleteApplication(id);
    removeById(id);
  }, [removeById]);
  //ver lo que me esta mandando la api

  return { data, loading, error, removeById, remove, refresh: load };

  

}

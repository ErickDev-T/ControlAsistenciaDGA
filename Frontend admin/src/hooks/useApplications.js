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

  const removeByCodigo = useCallback((codigo) => {
    setData((prev) => prev.filter((r) => r.codigo !== codigo && r.Codigo !== codigo));
  }, []);

  const remove = useCallback(async (codigo) => {
    await deleteApplication(codigo);
    removeByCodigo(codigo);
  }, [removeByCodigo]);

  return { data, loading, error, removeByCodigo, remove, refresh: load };
}

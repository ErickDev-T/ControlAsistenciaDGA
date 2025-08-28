// src/components/ConfirmDialog.jsx
import { useEffect, useRef } from "react";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "¿Confirmar acción?",
  description = "Esta acción no se puede deshacer.",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  tone = "default", 
}) {
  const backdropRef = useRef(null);
  const firstBtnRef = useRef(null);

  // cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // enfocar botón al abrir
  useEffect(() => {
    if (open) firstBtnRef.current?.focus();
  }, [open]);

  const confirmClasses =
    tone === "success"
      ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
      : tone === "destructive"
      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        // cerrar al hacer click fuera 
        if (e.target === backdropRef.current) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" />

      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl animate-scale-in">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-slate-600">{description}</p>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              ref={firstBtnRef}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
              onClick={onClose}
            >
              {cancelLabel}
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${confirmClasses}`}
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fade-in .12s ease-out forwards }
        .animate-scale-in { animation: scale-in .18s ease-out forwards; transform-origin: center; }
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scale-in { 
          0% { opacity: 0; transform: scale(.97) translateY(6px) } 
          100% { opacity: 1; transform: scale(1) translateY(0) } 
        }
      `}</style>
    </div>
  );
}

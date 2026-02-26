"use client";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-arctic-navy/40 backdrop-blur-sm" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-1 font-display text-lg font-700 text-arctic-navy">{title}</h3>
        <p className="mb-6 font-body text-sm text-stone">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg px-4 py-2 font-heading text-sm font-600 text-granite transition-colors hover:bg-frost-light">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-lg bg-alert-red px-4 py-2 font-heading text-sm font-600 text-white transition-colors hover:bg-alert-red/80">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

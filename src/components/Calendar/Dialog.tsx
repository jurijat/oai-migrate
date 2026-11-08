'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { CloseIcon } from '@/components/Icons';

export function Dialog({
  open,
  title,
  onClose,
  children,
  className = '',
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`calendar-dialog ${className}`}
    >
      <div className="calendar-dialog-header">
        <h2 id={titleId} className="calendar-heading m-0 text-[1.375rem]">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="calendar-icon-button grid h-10 w-10 place-items-center"
        >
          <CloseIcon size={18} />
        </button>
      </div>
      <div className="calendar-dialog-body">{children}</div>
    </dialog>
  );
}

export function useCopy(resetAfter = 2000) {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), resetAfter);
    return () => window.clearTimeout(timer);
  }, [copied, resetAfter]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
    } catch {
      setCopied(null);
    }
  };

  return { copied, copy };
}

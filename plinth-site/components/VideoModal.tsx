"use client";
import { useEffect, useRef } from "react";
import { IconClose } from "./sections/icons";

// Privacy-enhanced YouTube host. Replace with the real product video id.
const VIDEO_ID = "dQw4w9WgXcQ";

export default function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") { e.preventDefault(); closeRef.current?.focus(); } // single focusable control: trap
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lastFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Plinth product video"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close video"
          className="absolute -top-12 right-0 rounded-full p-2 text-bone hover:bg-bone/10">
          <IconClose />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-ink-900">
          <iframe className="h-full w-full" title="Plinth product video"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        </div>
      </div>
    </div>
  );
}

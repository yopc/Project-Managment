// Modal.jsx
import React from "react";

const Dialog = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null; // Do not render if closed

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDesc"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-md"
        onClick={stopPropagation}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 id="modalTitle" className="text-sm font-semibold text-slate-800">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div id="modalDesc" className="max-h-80 overflow-y-auto px-5 py-3">
          {children}
        </div>

        {/* Footer (optional) */}
        {footer && <div className="border-t border-slate-100 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Dialog;

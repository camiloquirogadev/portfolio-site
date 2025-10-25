import { forwardRef, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, className }, ref) => {
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // Ensures proper focus management and keyboard accessibility for modal closure
    useEffect(() => {
      if (!isOpen) return;

      // Focus close button when modal opens
      closeBtnRef.current?.focus();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          ref={ref}
          className={cn(
            "bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-xl max-w-2xl w-full mx-auto p-8 relative animate-fade-in",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {title}
            </h2>
          )}

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
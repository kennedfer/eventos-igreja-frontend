import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { Button } from "./Button";

type Props = {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    approveLabel?: string;
    cancelLabel?: string;
    isDestructive?: boolean;
    onApprove: (...args: any[]) => void;
    onCancel: () => void;
    closeOnBackdropClick?: boolean;
};

export const Modal = ({
    isOpen,
    title,
    children,
    isDestructive = false,
    approveLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onApprove,
    onCancel,
    closeOnBackdropClick = true,
}: Props) => {
    // Escape key close
    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) onCancel();
    };

    return createPortal(
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-text-light"
            onClick={handleBackdropClick}
        >
            <dialog
                open
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="relative bg-white rounded-md shadow-2xl flex flex-col w-full max-w-sm flex flex-col items-center  overflow-hidden text-text-light"
            >
                <h2 id="dialog-title" className="text-xl font-semibold p-3 border-border-light border-b-1 w-full text-center bg-background-light">{title}</h2>
                <div className="flex flex-col gap-2 w-full p-3">
                    <div className="text-center">
                        {children}
                    </div>
                    <div className="flex gap-2 mt-4 w-full">
                        <Button className="grow" onClick={onCancel} color="secondary">{cancelLabel}</Button>
                        <Button className="grow" onClick={onApprove} color={isDestructive ? "destructive" : "primary"}>{approveLabel}</Button>
                    </div>
                </div>
            </dialog>
        </div>,
        document.body
    );
};

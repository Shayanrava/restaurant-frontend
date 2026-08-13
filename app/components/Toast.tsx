import React from 'react'
interface ToastProp {
    toastMessage: string | null;
}
export default function Toast({ toastMessage }: ToastProp) {
    return (
        <div
            className={`fixed left-1/2 -translate-x-1/2 bg-[#7a1f1f] text-white px-7.5 py-3.75 rounded-[40px] flex items-center gap-2.5 transition-all duration-300 z-99999 ${toastMessage
                ? "opacity-100 bottom-13.75"
                : "opacity-0 bottom-8.75 pointer-events-none"
                }`}
        >
            <i className="fa-solid fa-circle-check"></i>
            <span>{toastMessage}</span>
        </div>
    )
}

import React from 'react'
interface ScrollTopProps {
    showScrollTop: boolean;
}

export default function ScrollTop({showScrollTop}:ScrollTopProps) {
    return (
        <button
            className={`fixed right-7.5 bottom-8.75 w-13.75 h-13.75 rounded-full bg-[#d4af37] text-[#4b2e2e] text-[22px] flex justify-center items-center cursor-pointer transition-all duration-300 z-999 ${showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <i className="fa-solid fa-angle-up"></i>
        </button>
    )
}

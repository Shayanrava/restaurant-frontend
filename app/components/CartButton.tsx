import React from 'react'

interface CartBtnProps {
    totalCartCount: number;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartButton({totalCartCount , setIsCartOpen } : CartBtnProps) {
    return (
        <button
            id="cartBtn"
            className="fixed left-8.75 bottom-8.75 w-16.25 h-16.25 md:w-18.75 md:h-18.75 rounded-full bg-linear-to-r from-[#7a1f1f] to-[#a62c2c] text-white text-[28px] flex justify-center items-center shadow-[0_15px_30px_rgba(0,0,0,0.25)] z-999 hover:scale-[1.08] transition-all duration-350 cursor-pointer"
            onClick={() => setIsCartOpen(true)}
        >
            <i className="fa-solid fa-cart-shopping"></i>
            <span
                id="cartCount"
                className="absolute -top-1.5 -right-1.5 bg-[#ffd65e] text-[#4b2e2e] w-7 h-7 rounded-full flex justify-center items-center font-bold text-[14px]"
            >
                {totalCartCount}
            </span>
        </button>
    )
}

import React from 'react'

export default function Hero() {
    return (
        <section
            id="hero"
            className="h-screen bg-[url('/images/heroimage.png')] bg-center bg-cover relative flex justify-center items-center text-center p-7.5"
        >
            <div className="absolute inset-0 bg-[rgba(35,20,10,0.55)]"></div>
            <div className="relative z-2 text-white max-w-200">
                <h2 className="font-lalezar font-bold text-[45px] sm:text-[52px] md:text-[60px] mb-6.25 text-[#ffd65e] leading-[1.3]">
                    تجربه‌ای متفاوت از غذاهای اصیل ایرانی
                </h2>
                <p className="text-[20px] md:text-[22px] font-bold leading-[2.2] mb-8.75">
                    استفاده از بهترین مواد اولیه، برنج ایرانی، گوشت تازه، ادویه‌های
                    سنتی و هنر آشپزی ایرانی.
                </p>
                <a
                    href="#products"
                    className="inline-block px-10.5 py-4 rounded-[50px] bg-linear-to-r from-[#d4af37] to-[#ffe58f] text-[#4b2e2e] text-[18px] font-bold shadow-[0_12px_25px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 transition-all duration-350"
                >
                    مشاهده منو
                </a>
            </div>
        </section>
    )
}

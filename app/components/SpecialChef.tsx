import React from 'react'

interface SpecialChefProps {
    addToCart: (id: number) => void;
}


export default function SpecialChef({addToCart} : SpecialChefProps) {
    return (
        <section id="special" className="py-25 px-[8%] bg-[#fffdf8]">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-15 text-center lg:text-right">
                <div className="flex justify-center items-center lg:-order-none -order-1">
                    <img
                        src="/images/special.png"
                        alt="چلوکباب سلطانی مخصوص شبستان"
                        className="w-full max-w-125 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] hover:scale-105 hover:-rotate-2 transition-all duration-400"
                    />
                </div>
                <div>
                    <span className="inline-block px-4.5 py-2 bg-[#d4af37] text-[#4b2e2e] rounded-[30px] font-bold">
                        ⭐ پیشنهاد ویژه سرآشپز
                    </span>
                    <h2 className="font-lalezar text-[50px] text-[#7a1f1f] my-5">
                        چلوکباب سلطانی شبستان
                    </h2>
                    <p className="text-[18px] leading-[2.2] text-[#555] my-6.25">
                        ترکیبی از کباب برگ، کباب کوبیده، برنج ایرانی درجه یک، کره محلی،
                        گوجه کبابی، ریحان تازه و زعفران ناب ایرانی.
                    </p>
                    <div className="text-[34px] font-bold text-[#2f6b4f] mb-6.25">
                        ۶۹۵,۰۰۰ تومان
                    </div>
                    <button
                        id="specialOrderBtn"
                        className="px-8.75 py-4 rounded-[40px] bg-linear-to-r from-[#7a1f1f] to-[#b92e2e] hover:from-[#d4af37] hover:to-[#f3d770] text-white hover:text-[#4b2e2e] text-[18px] font-bold transition-all duration-300 cursor-pointer"
                        onClick={() => addToCart(31)}
                    >
                        🍽 افزودن به سفارش
                    </button>
                </div>
            </div>
        </section>
    )
}

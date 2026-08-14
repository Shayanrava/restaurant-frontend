import React from 'react'

export default function About() {
    return (

        <section id="about" className="py-25 px-[8%] bg-[#f8f1e7]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center text-center lg:text-right">
                <div>
                    <img
                        src="/images/logo.webp"
                        alt="رستوران سنتی شبستان"
                        className="w-full rounded-[25px] shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                    />
                </div>
                <div>
                    <h2 className="font-lalezar text-[46px] text-[#7a1f1f] mb-5">
                        درباره شبستان
                    </h2>
                    <p className="text-[18px] leading-[2.2] mb-4.5 text-[#555]">
                        رستوران سنتی شبستان با الهام از معماری اصیل ایرانی، فضایی گرم و
                        دلنشین را برای دوستداران غذاهای سنتی فراهم کرده است.
                    </p>
                    <p className="text-[18px] leading-[2.2] mb-4.5 text-[#555]">
                        تمام غذاها با مواد اولیه تازه، برنج ایرانی، گوشت تازه و ادویه‌های
                        اصیل طبخ می‌شوند.
                    </p>
                    <p className="text-[18px] leading-[2.2] text-[#555]">
                        هدف ما تجربه‌ی طعمی ماندگار در کنار فضایی آرام و سنتی است.
                    </p>
                </div>
            </div>
        </section>
    )
}

import React, { useState } from 'react'

export default function WelcomeScreen() {
    const [welcomeHidden, setWelcomeHidden] = useState(false);
    const [welcomeDisplay, setWelcomeDisplay] = useState(true);
    
    const handleEnter = () => {
        setWelcomeHidden(true);
        setTimeout(() => {
            setWelcomeDisplay(false);
        }, 900);
    };
    return (
        <>
            {welcomeDisplay && (
                <section
                    id="welcome"
                    className={`fixed inset-0 w-full h-screen bg-[url('/images/hero.jpg')] bg-center bg-cover flex justify-center items-center z-9999 overflow-hidden transition-all duration-1000 ${welcomeHidden ? "opacity-0 invisible" : "opacity-100 visible"
                        }`}
                >
                    <div className="absolute inset-0 bg-[rgba(30,15,5,0.55)] backdrop-blur-[2px]"></div>
                    <div className="relative text-center text-white p-10 z-10">
                        <h1 className="font-lalezar text-[65px] tracking-wide mb-5 text-[#f9d977]">
                            رستوران سنتی شبستان
                        </h1>
                        <p className="text-[22px] leading-loose mb-8.75">
                            طعم اصیل غذاهای ایرانی
                            <br />
                            در فضایی گرم و دلنشین
                        </p>
                        <button
                            id="enterBtn"
                            onClick={handleEnter}
                            className="px-11.25 py-4.5 text-[20px] rounded-[60px] bg-linear-to-r from-[#d4af37] to-[#f5d97a] text-[#4b2e2e] font-bold shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer"
                        >
                            🍽 ورود به منوی رستوران
                        </button>
                    </div>
                </section>
            )}
        </>
    )
}

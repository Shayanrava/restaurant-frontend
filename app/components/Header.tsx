import React from 'react'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-auto md:h-21.25 bg-[rgba(122,31,31,0.95)] flex flex-col md:flex-row justify-between items-center px-5 md:px-15 py-5 md:py-0 gap-3.75 md:gap-0 z-999 backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-2.5 font-lalezar text-[30px] text-[#ffd65e]">
                <i className="fa-solid fa-utensils text-[28px]"></i>
                <span>شبستان</span>
            </div>
            <nav>
                <ul className="flex flex-wrap justify-center gap-6 md:gap-8.75 list-none">
                    {["hero:خانه", "products:منو", "special:ویژه سرآشپز", "about:درباره ما", "contact:تماس"].map((item) => {
                        const [id, label] = item.split(":");
                        return (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className="text-white text-[17px] font-semibold relative after:content-[''] after:absolute after:right-0 after:-bottom-2 after:w-0 after:h-0.75 after:bg-[#ffd65e] hover:after:w-full after:transition-all after:duration-350"
                                >
                                    {label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    )
}

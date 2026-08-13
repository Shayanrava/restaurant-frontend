import React from 'react';

interface CategoriesProps {
    currentCategory: string;
    setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function Categories({ currentCategory, setCurrentCategory }: CategoriesProps) {
    const categories = [
        { label: "🍽 همه", key: "all" },
        { label: "🍢 کباب‌ها", key: "kebab" },
        { label: "🍲 خورشت‌ها", key: "stew" },
        { label: "🍚 پلو های ایرانی", key: "rice" },
        { label: "🥗 پیش غذا", key: "appetizer" },
        { label: "🥤 نوشیدنی", key: "drink" },
        { label: "🍮 دسر", key: "dessert" },
    ];
    return (
        <section className="flex justify-center flex-wrap gap-4.5 py-12.5 px-5 bg-[#fff7ec]">
            {categories.map((cat) => (
                <button
                    key={cat.key}
                    className={`px-7.5 py-3.5 rounded-[40px] text-[16px] font-semibold border-2 transition-all duration-350 shadow-[0_6px_15px_rgba(0,0,0,0.08)] cursor-pointer ${currentCategory === cat.key
                            ? "bg-[#7a1f1f] text-white border-[#7a1f1f]"
                            : "bg-white text-[#6d2727] border-[#d4af37] hover:bg-[#d4af37] hover:text-white hover:-translate-y-1.25"
                        }`}
                    onClick={() => {
                        setCurrentCategory(cat.key);
                        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    {cat.label}
                </button>
            ))}
        </section>
    );
}
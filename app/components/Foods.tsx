import React from 'react'
import { products, Product } from "../data/products";

interface FoodsProps {
    searchQuery: string;
    currentCategory: string;
    addToCart: (id: number) => void;
}

export default function Foods({searchQuery , currentCategory , addToCart } : FoodsProps) {

    const filteredProducts = products.filter((item) => {
        const matchesCategory =
            currentCategory === "all" || item.category === currentCategory;
        const matchesSearch = item.name.includes(searchQuery.trim());
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="products" className="py-22.5 px-[8%]  lg:px-[2%]">
            <div className="text-center mb-15">
                <h2 className="font-lalezar font-bold text-[38px] md:text-[50px] text-[#7a1f1f] mb-3">
                    منوی رستوران شبستان
                </h2>
                <p className="text-[20px] text-[#131313]">
                    اصیل‌ترین غذاهای ایرانی با بهترین کیفیت
                </p>
            </div>
            <div id="productsContainer" className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.75">
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full text-center p-15 text-[22px] text-[#777]">
                        <h2>غذایی پیدا نشد</h2>
                    </div>
                ) : (
                    filteredProducts.map((prod) => (
                        <div
                            key={prod.id}
                            className="bg-white rounded-[25px] overflow-hidden shadow-[0_12px_25px_rgba(0,0,0,0.08)] hover:-translate-y-2.5 hover:shadow-[0_18px_35px_rgba(0,0,0,0.18)] transition-all duration-400 relative"
                        >
                            <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-60 object-contain p-6.25 bg-[#faf7f1]"
                            />
                            {prod.badge && (
                                <span className="absolute top-3 right-3 bg-linear-to-r from-[#c89b3c] to-[#f2d27a] text-white px-3 py-1.5 rounded-[20px] text-[13px] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                                    {prod.badge}
                                </span>
                            )}
                            <div className="p-6.25">
                                <h3 className="font-lalezar text-[24px] text-[#6d2727] mb-3 text-center">
                                    {prod.name}
                                </h3>
                                <p className="text-[15px] leading-[1.9] text-[#666] min-h-17.5">
                                    {prod.description}
                                </p>
                                <div className="text-[24px] font-bold text-[#2f6b4f] my-5">
                                    {prod.price.toLocaleString("fa-IR")} تومان
                                </div>
                                <button
                                    className="w-full p-3.75 rounded-[15px] bg-linear-to-r from-[#7a1f1f] to-[#b12b2b] hover:from-[#d4af37] hover:to-[#c9a232] text-white hover:text-[#4b2e2e] text-[17px] font-bold transition-all duration-350 cursor-pointer"
                                    onClick={() => addToCart(prod.id)}
                                >
                                    افزودن به سفارش
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

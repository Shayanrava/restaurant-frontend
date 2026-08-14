import React from 'react'

export default function Gallery() {
    return (
        <section className="py-25 px-[8%] bg-[#fffdf8]">
            <div className="text-center mb-15">
                <h2 className="font-lalezar text-[50px] text-[#7a1f1f] mb-3">
                    گالری رستوران
                </h2>
                <p className="text-[20px] text-[#131313]">نگاهی به فضای سنتی شبستان</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6.25">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.12)] group"
                    >
                        <img
                            src={`/images/gallery${i}.webp`}
                            alt=""
                            className="w-full h-62.5 object-cover transition-transform duration-400 group-hover:scale-[1.08]"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

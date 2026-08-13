import React from 'react'

export default function Contact() {
    return (
        <section id="contact" className="py-25 px-[8%] bg-[#f8f1e7]">
            <div className="text-center mb-15">
                <h2 className="font-lalezar text-[50px] text-[#7a1f1f] mb-3">
                    تماس با ما
                </h2>
                <p className="text-[20px] text-[#131313]">همیشه میزبان شما هستیم</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7.5">
                <div className="bg-white p-8.75 rounded-[20px] text-center shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300">
                    <i className="fa-solid fa-location-dot text-[42px] text-[#7a1f1f] mb-4.5"></i>
                    <h3 className="font-lalezar text-[24px] text-[#7a1f1f] mb-3">
                        آدرس
                    </h3>
                    <p className="leading-loose">تهران، خیابان ولیعصر، کوچه شبستان</p>
                </div>
                <div className="bg-white p-8.75 rounded-[20px] text-center shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300">
                    <i className="fa-solid fa-phone text-[42px] text-[#7a1f1f] mb-4.5"></i>
                    <h3 className="font-lalezar text-[24px] text-[#7a1f1f] mb-3">
                        تلفن
                    </h3>
                    <p className="leading-loose">021-12345678</p>
                </div>
                <div className="bg-white p-8.75 rounded-[20px] text-center shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300">
                    <i className="fa-solid fa-clock text-[42px] text-[#7a1f1f] mb-4.5"></i>
                    <h3 className="font-lalezar text-[24px] text-[#7a1f1f] mb-3">
                        ساعات کاری
                    </h3>
                    <p className="leading-loose">هر روز ۱۲ ظهر تا ۱۲ شب</p>
                </div>
            </div>
        </section>
    )
}

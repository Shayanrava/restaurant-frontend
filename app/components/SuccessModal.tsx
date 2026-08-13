import React from 'react'
interface SuccessModalProps {
    setIsSuccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSuccessOpen : boolean
}

export default function SuccessModal({setIsSuccessOpen , isSuccessOpen}:SuccessModalProps) {
    return (
        <div
            className={`fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.55)] transition-all duration-300 z-5000 ${isSuccessOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div className="bg-white p-11.25 rounded-[25px] text-center w-105 max-w-[90%]">
                <i className="fa-solid fa-circle-check text-[70px] text-[#2f6b4f] mb-5"></i>
                <h2 className="font-lalezar text-[#7a1f1f] text-[28px] mb-3.75">
                    سفارش شما ثبت شد
                </h2>
                <p className="leading-loose mb-6.25">
                    از اینکه رستوران سنتی شبستان را انتخاب کردید سپاسگزاریم.
                </p>
                <button
                    className="px-8.75 py-3.5 rounded-[40px] bg-[#7a1f1f] text-white text-[17px] cursor-pointer"
                    onClick={() => setIsSuccessOpen(false)}
                >
                    متوجه شدم
                </button>
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import { CartItem } from '../hooks/useCart';

interface CartModalProps {
    cart: CartItem[];
    isCartOpen: boolean;
    totalCartPrice: number;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    showToast: (msg: string) => void;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSuccessOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartModal({
    cart,
    isCartOpen,
    totalCartPrice,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    showToast,
    setIsCartOpen,
    setIsSuccessOpen
}: CartModalProps) {
    const [tableNumber, setTableNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [orderNote, setOrderNote] = useState("");

    const handleSubmitOrder = () => {
        if (!customerName.trim()) return showToast("لطفاً نام مشتری را وارد کنید.");
        if (!customerPhone.trim()) return showToast("لطفاً شماره تماس را وارد کنید.");
        if (!/^09\d{9}$/.test(customerPhone.trim())) return showToast("شماره تماس معتبر نیست.");
        if (!tableNumber) return showToast("لطفاً شماره میز را انتخاب کنید.");

        clearCart();
        setIsCartOpen(false);
        setIsSuccessOpen(true);
        setCustomerName("");
        setCustomerPhone("");
        setOrderNote("");
        setTableNumber("");
    };

    return (
        <div className={`fixed inset-0 bg-[rgba(0,0,0,0.55)] flex justify-center items-center transition-all duration-350 z-3000 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className="w-162.5 max-w-[95%] max-h-[90vh] overflow-y-auto bg-[#fffdf8] rounded-[25px] p-3 lg:p-8.75 shadow-[0_20px_45px_rgba(0,0,0,0.3)] ">
                <div className="flex justify-between items-center mb-7.5 border-b-2 border-[#eee] pb-3.75">
                    <h2 className="font-lalezar text-[36px] text-[#7a1f1f]">🛒 سبد سفارش</h2>
                    <button className="bg-none text-[28px] text-[#7a1f1f] cursor-pointer" onClick={() => setIsCartOpen(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="flex flex-col gap-5 mb-7.5">
                    {cart.length === 0 ? (
                        <div className="text-center p-10 text-[18px] text-[#888]">سبد سفارش شما خالی است.</div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="w-full p-3.75 rounded-[18px] bg-[#faf7f1]">
                                <div className="grid grid-cols-[auto_1fr_auto] gap-4.5 items-center p-1">
                                    <img src={item.image} alt={item.name} className="size-36 lg:size-36 object-contain" />
                                    <div>
                                        <div className="text-[20px] font-bold text-[#6d2727] mb-2 hidden md:flex">{item.name}</div>
                                        <div className="text-[#2f6b4f] font-bold hidden md:flex">{item.price.toLocaleString("fa-IR")} تومان</div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row justify-center items-center gap-2.5">
                                        <div className="flex gap-2.5 items-center">
                                            <button onClick={() => decreaseQty(item.id)} className="w-8.75 h-8.75 rounded-full bg-[#7a1f1f] text-white text-[18px] cursor-pointer">−</button>
                                            <span className="font-bold text-[18px]">{item.quantity}</span>
                                            <button onClick={() => increaseQty(item.id)} className="w-8.75 h-8.75 rounded-full bg-[#7a1f1f] text-white text-[18px] cursor-pointer">+</button>
                                        </div>
                                        <button className="text-[#7a1f1f] text-[18px] cursor-pointer" onClick={() => removeItem(item.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex md:hidden justify-between p-3">
                                    <div className="text-[20px] lg:font-[20px] font-bold text-[#6d2727] mb-2">
                                        {item.name}
                                    </div>
                                    <div className="text-[#2f6b4f] font-bold">
                                        {item.price.toLocaleString("fa-IR")} تومان
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="border-t-2 border-[#eee] pt-6.25">
                    <div className="flex justify-between text-[24px] font-bold mb-6.25 text-[#2f6b4f]">
                        <span>جمع کل</span>
                        <span>{totalCartPrice.toLocaleString("fa-IR")} تومان</span>
                    </div>

                    <div className="flex flex-col gap-2.5 mb-6.25">
                        <label className="font-bold">شماره میز</label>
                        <select
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="p-3.5 rounded-xl border-2 border-[#d4af37] text-[17px] outline-none"
                        >
                            <option value="">انتخاب شماره میز</option>
                            <option value="1">میز ۱</option>
                            <option value="2">میز ۲</option>
                            <option value="3">میز ۳</option>
                            <option value="4">میز ۴</option>
                            <option value="5">میز ۵</option>
                            <option value="VIP1">میز VIP 1</option>
                            <option value="VIP2">میز VIP 2</option>
                        </select>
                    </div>

                    <div className="mt-6.25">
                        <div className="mb-4.5">
                            <label className="block mb-2 font-bold text-[#4b2e2e] text-[15px]">
                                👤 نام و نام خانوادگی
                            </label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full border-2 border-[#d4af37] rounded-[14px] p-[14px_16px] text-[15px] bg-white transition-all duration-300 focus:outline-none focus:border-[#7a1f1f] focus:shadow-[0_0_10px_rgba(122,31,31,0.15)]"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="block mb-2 font-bold text-[#4b2e2e] text-[15px]">
                                📞 شماره تماس
                            </label>
                            <input
                                type="tel"
                                maxLength={11}
                                placeholder="09123456789"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className="w-full border-2 border-[#d4af37] rounded-[14px] p-[14px_16px] text-[15px] bg-white transition-all duration-300 focus:outline-none focus:border-[#7a1f1f] focus:shadow-[0_0_10px_rgba(122,31,31,0.15)]"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="block mb-2 font-bold text-[#4b2e2e] text-[15px]">
                                📝 توضیحات سفارش
                            </label>
                            <textarea
                                rows={3}
                                placeholder="مثلاً بدون پیاز، دوغ بدون یخ و ..."
                                value={orderNote}
                                onChange={(e) => setOrderNote(e.target.value)}
                                className="w-full border-2 border-[#d4af37] rounded-[14px] p-[14px_16px] text-[15px] bg-white transition-all duration-300 focus:outline-none focus:border-[#7a1f1f] focus:shadow-[0_0_10px_rgba(122,31,31,0.15)] resize-y min-h-22.5"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        className="w-full p-4 rounded-[15px] bg-linear-to-r from-[#7a1f1f] to-[#b52e2e] hover:from-[#d4af37] hover:to-[#f0cd62] text-white hover:text-[#4b2e2e] text-[19px] font-bold transition-all duration-300 cursor-pointer"
                        onClick={handleSubmitOrder}
                    >
                        ثبت سفارش
                    </button>
                </div>
            </div>
        </div>
    );
}
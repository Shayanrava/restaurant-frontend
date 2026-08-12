"use client";

import { useState, useEffect } from "react";
import { products, Product } from "./data/products";

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [welcomeHidden, setWelcomeHidden] = useState(false);
  const [welcomeDisplay, setWelcomeDisplay] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form States
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderNote, setOrderNote] = useState("");

  // Load Cart
  useEffect(() => {
    const saved = localStorage.getItem("restaurantCart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("restaurantCart", JSON.stringify(newCart));
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleEnter = () => {
    setWelcomeHidden(true);
    setTimeout(() => {
      setWelcomeDisplay(false);
    }, 900);
  };

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name.includes(searchQuery.trim());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (id: number) => {
    const targetProduct = products.find((p) => p.id === id);
    if (!targetProduct) return;

    const existing = cart.find((item) => item.id === id);
    let updated: CartItem[];
    if (existing) {
      updated = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cart, { ...targetProduct, quantity: 1 }];
    }
    saveCart(updated);
    showToast(`${targetProduct.name} به سبد سفارش اضافه شد`);
  };

  const increaseQty = (id: number) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updated);
  };

  const decreaseQty = (id: number) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmitOrder = () => {
    if (!customerName.trim()) {
      showToast("لطفاً نام مشتری را وارد کنید.");
      return;
    }
    if (!customerPhone.trim()) {
      showToast("لطفاً شماره تماس را وارد کنید.");
      return;
    }
    if (!/^09\d{9}$/.test(customerPhone.trim())) {
      showToast("شماره تماس معتبر نیست.");
      return;
    }
    if (!tableNumber) {
      showToast("لطفاً شماره میز را انتخاب کنید.");
      return;
    }

    saveCart([]);
    setIsCartOpen(false);
    setIsSuccessOpen(true);
    setCustomerName("");
    setCustomerPhone("");
    setOrderNote("");
    setTableNumber("");
  };

  return (
    <>
      {/* Welcome Screen */}
      {welcomeDisplay && (
        <section
          id="welcome"
          className={`fixed inset-0 w-full h-screen bg-[url('/images/hero.jpg')] bg-center bg-cover flex justify-center items-center z-[9999] overflow-hidden transition-all duration-1000 ${welcomeHidden ? "opacity-0 invisible" : "opacity-100 visible"
            }`}
        >
          <div className="absolute inset-0 bg-[rgba(30,15,5,0.55)] backdrop-blur-[2px]"></div>
          <div className="relative text-center text-white p-10 z-10">
            <h1 className="font-lalezar text-[65px] tracking-wide mb-5 text-[#f9d977]">
              رستوران سنتی شبستان
            </h1>
            <p className="text-[22px] leading-[2] mb-[35px]">
              طعم اصیل غذاهای ایرانی
              <br />
              در فضایی گرم و دلنشین
            </p>
            <button
              id="enterBtn"
              onClick={handleEnter}
              className="px-[45px] py-[18px] text-[20px] rounded-[60px] bg-gradient-to-r from-[#d4af37] to-[#f5d97a] text-[#4b2e2e] font-bold shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:-translate-y-[6px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer"
            >
              🍽 ورود به منوی رستوران
            </button>
          </div>
        </section>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-auto md:h-[85px] bg-[rgba(122,31,31,0.95)] flex flex-col md:flex-row justify-between items-center px-5 md:px-[60px] py-5 md:py-0 gap-[15px] md:gap-0 z-[999] backdrop-blur-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
        <div className="flex items-center gap-[10px] font-lalezar text-[30px] text-[#ffd65e]">
          <i className="fa-solid fa-utensils text-[28px]"></i>
          <span>شبستان</span>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center gap-[15px] md:gap-[35px] list-none">
            {["hero:خانه", "products:منو", "special:ویژه سرآشپز", "about:درباره ما", "contact:تماس"].map((item) => {
              const [id, label] = item.split(":");
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-white text-[17px] font-semibold relative after:content-[''] after:absolute after:right-0 after:-bottom-[8px] after:w-0 after:h-[3px] after:bg-[#ffd65e] hover:after:w-full after:transition-all after:duration-350"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="h-screen bg-[url('/images/heroimage.png')] bg-center bg-cover relative flex justify-center items-center text-center p-[30px]"
      >
        <div className="absolute inset-0 bg-[rgba(35,20,10,0.55)]"></div>
        <div className="relative z-[2] text-white max-w-[800px]">
          <h2 className="font-lalezar font-bold text-[45px] sm:text-[52px] md:text-[60px] mb-[25px] text-[#ffd65e] leading-[1.3]">
            تجربه‌ای متفاوت از غذاهای اصیل ایرانی
          </h2>
          <p className="text-[20px] md:text-[22px] font-bold leading-[2.2] mb-[35px]">
            استفاده از بهترین مواد اولیه، برنج ایرانی، گوشت تازه، ادویه‌های
            سنتی و هنر آشپزی ایرانی.
          </p>
          <a
            href="#products"
            className="inline-block px-[42px] py-[16px] rounded-[50px] bg-gradient-to-r from-[#d4af37] to-[#ffe58f] text-[#4b2e2e] text-[18px] font-bold shadow-[0_12px_25px_rgba(0,0,0,0.25)] hover:-translate-y-[6px] transition-all duration-350"
          >
            مشاهده منو
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="flex justify-center flex-wrap gap-[18px] py-[50px] px-[20px] bg-[#fff7ec]">
        {[
          { label: "🍽 همه", key: "all" },
          { label: "🍢 کباب‌ها", key: "kebab" },
          { label: "🍲 خورشت‌ها", key: "stew" },
          { label: "🍚 پلو های ایرانی", key: "rice" },
          { label: "🥗 پیش غذا", key: "appetizer" },
          { label: "🥤 نوشیدنی", key: "drink" },
          { label: "🍮 دسر", key: "dessert" },
        ].map((cat) => (
          <button
            key={cat.key}
            className={`px-[30px] py-[14px] rounded-[40px] text-[16px] font-semibold border-2 transition-all duration-350 shadow-[0_6px_15px_rgba(0,0,0,0.08)] cursor-pointer ${currentCategory === cat.key
              ? "bg-[#7a1f1f] text-white border-[#7a1f1f]"
              : "bg-white text-[#6d2727] border-[#d4af37] hover:bg-[#d4af37] hover:text-white hover:-translate-y-[5px]"
              }`}
            onClick={() => {
              setCurrentCategory(cat.key);
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Search */}
      <section className="flex justify-center pt-[20px] px-[20px] pb-[50px] bg-[url('/images/paternmenu.png')] bg-repeat">
        <input
          type="text"
          id="searchInput"
          placeholder="جستجوی غذا ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[420px] max-w-[90%] px-[25px] py-[16px] rounded-[40px] border-2 border-[#d4af37] text-[17px] bg-white text-[#333] outline-none transition-all duration-350 focus:border-[#7a1f1f] focus:shadow-[0_0_15px_rgba(122,31,31,0.2)]"
        />
      </section>

      {/* Products Grid */}
      <section id="products" className="py-[90px] px-[8%]  lg:px-[2%]">
        <div className="text-center mb-[60px]">
          <h2 className="font-lalezar font-bold text-[38px] md:text-[50px] text-[#7a1f1f] mb-[12px]">
            منوی رستوران شبستان
          </h2>
          <p className="text-[20px] text-[#131313]">
            اصیل‌ترین غذاهای ایرانی با بهترین کیفیت
          </p>
        </div>
        <div id="productsContainer" className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[35px]">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center p-[60px] text-[22px] text-[#777]">
              <h2>غذایی پیدا نشد</h2>
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-[25px] overflow-hidden shadow-[0_12px_25px_rgba(0,0,0,0.08)] hover:-translate-y-[10px] hover:shadow-[0_18px_35px_rgba(0,0,0,0.18)] transition-all duration-400 relative"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-[240px] object-contain p-[25px] bg-[#faf7f1]"
                />
                {prod.badge && (
                  <span className="absolute top-[12px] right-[12px] bg-gradient-to-r from-[#c89b3c] to-[#f2d27a] text-white px-[12px] py-[6px] rounded-[20px] text-[13px] font-bold shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                    {prod.badge}
                  </span>
                )}
                <div className="p-[25px]">
                  <h3 className="font-lalezar text-[24px] text-[#6d2727] mb-[12px]">
                    {prod.name}
                  </h3>
                  <p className="text-[15px] leading-[1.9] text-[#666] min-h-[70px]">
                    {prod.description}
                  </p>
                  <div className="text-[24px] font-bold text-[#2f6b4f] my-[20px]">
                    {prod.price.toLocaleString("fa-IR")} تومان
                  </div>
                  <button
                    className="w-full p-[15px] rounded-[15px] bg-gradient-to-r from-[#7a1f1f] to-[#b12b2b] hover:from-[#d4af37] hover:to-[#c9a232] text-white hover:text-[#4b2e2e] text-[17px] font-bold transition-all duration-350 cursor-pointer"
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

      {/* Floating Cart Button */}
      <button
        id="cartBtn"
        className="fixed left-[35px] bottom-[35px] w-[65px] h-[65px] md:w-[75px] md:h-[75px] rounded-full bg-gradient-to-r from-[#7a1f1f] to-[#a62c2c] text-white text-[28px] flex justify-center items-center shadow-[0_15px_30px_rgba(0,0,0,0.25)] z-[999] hover:scale-[1.08] transition-all duration-350 cursor-pointer"
        onClick={() => setIsCartOpen(true)}
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span
          id="cartCount"
          className="absolute -top-[6px] -right-[6px] bg-[#ffd65e] text-[#4b2e2e] w-[28px] h-[28px] rounded-full flex justify-center items-center font-bold text-[14px]"
        >
          {totalCartCount}
        </span>
      </button>

      {/* Special Chef */}
      <section id="special" className="py-[100px] px-[8%] bg-[#fffdf8]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[60px] text-center lg:text-right">
          <div className="flex justify-center items-center lg:-order-none -order-1">
            <img
              src="/images/special.png"
              alt="چلوکباب سلطانی مخصوص شبستان"
              className="w-full max-w-[500px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] hover:scale-105 hover:-rotate-2 transition-all duration-400"
            />
          </div>
          <div>
            <span className="inline-block px-[18px] py-[8px] bg-[#d4af37] text-[#4b2e2e] rounded-[30px] font-bold">
              ⭐ پیشنهاد ویژه سرآشپز
            </span>
            <h2 className="font-lalezar text-[50px] text-[#7a1f1f] my-[20px]">
              چلوکباب سلطانی شبستان
            </h2>
            <p className="text-[18px] leading-[2.2] text-[#555] my-[25px]">
              ترکیبی از کباب برگ، کباب کوبیده، برنج ایرانی درجه یک، کره محلی،
              گوجه کبابی، ریحان تازه و زعفران ناب ایرانی.
            </p>
            <div className="text-[34px] font-bold text-[#2f6b4f] mb-[25px]">
              ۶۹۵,۰۰۰ تومان
            </div>
            <button
              id="specialOrderBtn"
              className="px-[35px] py-[16px] rounded-[40px] bg-gradient-to-r from-[#7a1f1f] to-[#b92e2e] hover:from-[#d4af37] hover:to-[#f3d770] text-white hover:text-[#4b2e2e] text-[18px] font-bold transition-all duration-300 cursor-pointer"
              onClick={() => addToCart(31)}
            >
              🍽 افزودن به سفارش
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-[100px] px-[8%] bg-[#f8f1e7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center text-center lg:text-right">
          <div>
            <img
              src="/images/logo.png"
              alt="رستوران سنتی شبستان"
              className="w-full rounded-[25px] shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
            />
          </div>
          <div>
            <h2 className="font-lalezar text-[46px] text-[#7a1f1f] mb-[20px]">
              درباره شبستان
            </h2>
            <p className="text-[18px] leading-[2.2] mb-[18px] text-[#555]">
              رستوران سنتی شبستان با الهام از معماری اصیل ایرانی، فضایی گرم و
              دلنشین را برای دوستداران غذاهای سنتی فراهم کرده است.
            </p>
            <p className="text-[18px] leading-[2.2] mb-[18px] text-[#555]">
              تمام غذاها با مواد اولیه تازه، برنج ایرانی، گوشت تازه و ادویه‌های
              اصیل طبخ می‌شوند.
            </p>
            <p className="text-[18px] leading-[2.2] text-[#555]">
              هدف ما تجربه‌ی طعمی ماندگار در کنار فضایی آرام و سنتی است.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-[100px] px-[8%] bg-[#fffdf8]">
        <div className="text-center mb-[60px]">
          <h2 className="font-lalezar text-[50px] text-[#7a1f1f] mb-[12px]">
            گالری رستوران
          </h2>
          <p className="text-[20px] text-[#131313]">نگاهی به فضای سنتی شبستان</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[25px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.12)] group"
            >
              <img
                src={`/images/gallery${i}.jpg`}
                alt=""
                className="w-full h-[250px] object-cover transition-transform duration-400 group-hover:scale-[1.08]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-[100px] px-[8%] bg-[#f8f1e7]">
        <div className="text-center mb-[60px]">
          <h2 className="font-lalezar text-[50px] text-[#7a1f1f] mb-[12px]">
            تماس با ما
          </h2>
          <p className="text-[20px] text-[#131313]">همیشه میزبان شما هستیم</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px]">
          <div className="bg-white p-[35px] rounded-[20px] text-center shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[8px] transition-all duration-300">
            <i className="fa-solid fa-location-dot text-[42px] text-[#7a1f1f] mb-[18px]"></i>
            <h3 className="font-lalezar text-[24px] text-[#7a1f1f] mb-[12px]">
              آدرس
            </h3>
            <p className="leading-[2]">تهران، خیابان ولیعصر، کوچه شبستان</p>
          </div>
          <div className="bg-white p-[35px] rounded-[20px] text-center shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[8px] transition-all duration-300">
            <i className="fa-solid fa-phone text-[42px] text-[#7a1f1f] mb-[18px]"></i>
            <h3 className="font-lalezar text-[24px] text-[#7a1f1f] mb-[12px]">
              تلفن
            </h3>
            <p className="leading-[2]">021-12345678</p>
          </div>
          <div className="bg-white p-[35px] rounded-[20px] text-center shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[8px] transition-all duration-300">
            <i className="fa-solid fa-clock text-[42px] text-[#7a1f1f] mb-[18px]"></i>
            <h3 className="font-lalezar text-[24px] text-[#7a1f1f] mb-[12px]">
              ساعات کاری
            </h3>
            <p className="leading-[2]">هر روز ۱۲ ظهر تا ۱۲ شب</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4b2e2e] text-white text-center py-[50px] px-[20px]">
        <div className="font-lalezar text-[34px] mb-[15px] text-[#ffd65e]">
          <i className="fa-solid fa-utensils"></i> رستوران سنتی شبستان
        </div>
        <p className="mt-[10px] text-[#ddd]">طعم اصیل غذاهای ایرانی</p>
        <p className="mt-[10px] text-[#ddd]">© تمامی حقوق محفوظ است.</p>
      </footer>

      {/* Cart Modal */}
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.55)] flex justify-center items-center transition-all duration-350 z-[3000] ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="w-[650px] max-w-[95%] max-h-[90vh] overflow-y-auto bg-[#fffdf8] rounded-[25px] p-[35px] shadow-[0_20px_45px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-center mb-[30px] border-b-2 border-[#eee] pb-[15px]">
            <h2 className="font-lalezar text-[36px] text-[#7a1f1f]">
              🛒 سبد سفارش
            </h2>
            <button
              className="bg-none text-[28px] text-[#7a1f1f] cursor-pointer"
              onClick={() => setIsCartOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="flex flex-col gap-[20px] mb-[30px]">
            {cart.length === 0 ? (
              <div className="text-center p-[40px] text-[18px] text-[#888]">
                سبد سفارش شما خالی است.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[90px_1fr_auto] gap-[18px] items-center p-[15px] rounded-[18px] bg-[#faf7f1]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[80px] h-[80px] object-contain"
                  />
                  <div>
                    <div className="text-[20px] font-bold text-[#6d2727] mb-[8px]">
                      {item.name}
                    </div>
                    <div className="text-[#2f6b4f] font-bold">
                      {item.price.toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-[35px] h-[35px] rounded-full bg-[#7a1f1f] text-white text-[18px] cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-bold text-[18px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-[35px] h-[35px] rounded-full bg-[#7a1f1f] text-white text-[18px] cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      className="text-[#7a1f1f] text-[18px] mr-2 cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t-2 border-[#eee] pt-[25px]">
            <div className="flex justify-between text-[24px] font-bold mb-[25px] text-[#2f6b4f]">
              <span>جمع کل</span>
              <span>{totalCartPrice.toLocaleString("fa-IR")} تومان</span>
            </div>

            <div className="flex flex-col gap-[10px] mb-[25px]">
              <label className="font-bold">شماره میز</label>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="p-[14px] rounded-[12px] border-2 border-[#d4af37] text-[17px] outline-none"
              >
                <option value="">انتخاب کنید</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-[25px]">
              <div className="mb-[18px]">
                <label className="block mb-[8px] font-bold text-[#4b2e2e] text-[15px]">
                  👤 نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border-2 border-[#d4af37] rounded-[14px] p-[14px_16px] text-[15px] bg-white transition-all duration-300 focus:outline-none focus:border-[#7a1f1f] focus:shadow-[0_0_10px_rgba(122,31,31,0.15)]"
                />
              </div>

              <div className="mb-[18px]">
                <label className="block mb-[8px] font-bold text-[#4b2e2e] text-[15px]">
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

              <div className="mb-[18px]">
                <label className="block mb-[8px] font-bold text-[#4b2e2e] text-[15px]">
                  📝 توضیحات سفارش
                </label>
                <textarea
                  rows={3}
                  placeholder="مثلاً بدون پیاز، دوغ بدون یخ و ..."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full border-2 border-[#d4af37] rounded-[14px] p-[14px_16px] text-[15px] bg-white transition-all duration-300 focus:outline-none focus:border-[#7a1f1f] focus:shadow-[0_0_10px_rgba(122,31,31,0.15)] resize-y min-h-[90px]"
                ></textarea>
              </div>
            </div>

            <button
              className="w-full p-[16px] rounded-[15px] bg-gradient-to-r from-[#7a1f1f] to-[#b52e2e] hover:from-[#d4af37] hover:to-[#f0cd62] text-white hover:text-[#4b2e2e] text-[19px] font-bold transition-all duration-300 cursor-pointer"
              onClick={handleSubmitOrder}
            >
              ثبت سفارش
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div
        className={`fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.55)] transition-all duration-300 z-[5000] ${isSuccessOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="bg-white p-[45px] rounded-[25px] text-center w-[420px] max-w-[90%]">
          <i className="fa-solid fa-circle-check text-[70px] text-[#2f6b4f] mb-[20px]"></i>
          <h2 className="font-lalezar text-[#7a1f1f] text-[28px] mb-[15px]">
            سفارش شما ثبت شد
          </h2>
          <p className="leading-[2] mb-[25px]">
            از اینکه رستوران سنتی شبستان را انتخاب کردید سپاسگزاریم.
          </p>
          <button
            className="px-[35px] py-[14px] rounded-[40px] bg-[#7a1f1f] text-white text-[17px] cursor-pointer"
            onClick={() => setIsSuccessOpen(false)}
          >
            متوجه شدم
          </button>
        </div>
      </div>

      {/* Scroll To Top */}
      <button
        className={`fixed right-[30px] bottom-[35px] w-[55px] h-[55px] rounded-full bg-[#d4af37] text-[#4b2e2e] text-[22px] flex justify-center items-center cursor-pointer transition-all duration-300 z-[999] ${showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-angle-up"></i>
      </button>

      {/* Toast Component */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 bg-[#7a1f1f] text-white px-[30px] py-[15px] rounded-[40px] flex items-center gap-[10px] transition-all duration-300 z-[99999] ${toastMessage
          ? "opacity-100 bottom-[55px]"
          : "opacity-0 bottom-[35px] pointer-events-none"
          }`}
      >
        <i className="fa-solid fa-circle-check"></i>
        <span>{toastMessage}</span>
      </div>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

  // Load Cart from LocalStorage
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

  // Save Cart
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("restaurantCart", JSON.stringify(newCart));
  };

  // Scroll Event
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toast Function
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Welcome Screen Handler
  const handleEnter = () => {
    setWelcomeHidden(true);
    setTimeout(() => {
      setWelcomeDisplay(false);
    }, 900);
  };

  // Filter Products
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name.includes(searchQuery.trim());
    return matchesCategory && matchesSearch;
  });

  // Cart Management
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

  // Submit Order
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
          className={`welcome-screen ${welcomeHidden ? "hide" : ""}`}
        >
          <div className="welcome-overlay"></div>
          <div className="welcome-content">
            <h1>رستوران سنتی شبستان</h1>
            <p>
              طعم اصیل غذاهای ایرانی
              <br />
              در فضایی گرم و دلنشین
            </p>
            <button id="enterBtn" onClick={handleEnter}>
              🍽 ورود به منوی رستوران
            </button>
          </div>
        </section>
      )}

      {/* Header */}
      <header className="header">
        <div className="logo">
          <i className="fa-solid fa-utensils"></i>
          <span>شبستان</span>
        </div>
        <nav>
          <ul>
            <li><a href="#hero">خانه</a></li>
            <li><a href="#products">منو</a></li>
            <li><a href="#special">ویژه سرآشپز</a></li>
            <li><a href="#about">درباره ما</a></li>
            <li><a href="#contact">تماس</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2>تجربه‌ای متفاوت از غذاهای اصیل ایرانی</h2>
          <p>
            استفاده از بهترین مواد اولیه، برنج ایرانی، گوشت تازه، ادویه‌های
            سنتی و هنر آشپزی ایرانی.
          </p>
          <a href="#products" className="hero-btn">
            مشاهده منو
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
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
            className={`category-btn ${
              currentCategory === cat.key ? "active" : ""
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
      <section className="search-section">
        <input
          type="text"
          id="searchInput"
          placeholder="جستجوی غذا ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Products Grid */}
      <section id="products" className="products-section">
        <div className="section-title">
          <h2>منوی رستوران شبستان</h2>
          <p>اصیل‌ترین غذاهای ایرانی با بهترین کیفیت</p>
        </div>
        <div id="productsContainer" className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-product">
              <h2>غذایی پیدا نشد</h2>
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div key={prod.id} className="product-card show-card">
                <img src={prod.image} alt={prod.name} />
                {prod.badge && (
                  <span className="product-badge">{prod.badge}</span>
                )}
                <div className="product-info">
                  <h3 className="product-title">{prod.name}</h3>
                  <p className="product-desc">{prod.description}</p>
                  <div className="product-price">
                    {prod.price.toLocaleString("fa-IR")} تومان
                  </div>
                  <button
                    className="add-cart"
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
        className="cart-btn"
        onClick={() => setIsCartOpen(true)}
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span id="cartCount">{totalCartCount}</span>
      </button>

      {/* Special Chef */}
      <section id="special" className="special-section">
        <div className="special-container">
          <div className="special-image">
            <img
              src="/images/special.png"
              alt="چلوکباب سلطانی مخصوص شبستان"
            />
          </div>
          <div className="special-content">
            <span className="special-tag">⭐ پیشنهاد ویژه سرآشپز</span>
            <h2>چلوکباب سلطانی شبستان</h2>
            <p>
              ترکیبی از کباب برگ، کباب کوبیده، برنج ایرانی درجه یک، کره محلی،
              گوجه کبابی، ریحان تازه و زعفران ناب ایرانی.
            </p>
            <div className="special-price">۶۹۵,۰۰۰ تومان</div>
            <button
              id="specialOrderBtn"
              className="special-btn"
              onClick={() => addToCart(31)}
            >
              🍽 افزودن به سفارش
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src="/images/logo.png" alt="رستوران سنتی شبستان" />
          </div>
          <div className="about-content">
            <h2>درباره شبستان</h2>
            <p>
              رستوران سنتی شبستان با الهام از معماری اصیل ایرانی، فضایی گرم و
              دلنشین را برای دوستداران غذاهای سنتی فراهم کرده است.
            </p>
            <p>
              تمام غذاها با مواد اولیه تازه، برنج ایرانی، گوشت تازه و ادویه‌های
              اصیل طبخ می‌شوند.
            </p>
            <p>هدف ما تجربه‌ی طعمی ماندگار در کنار فضایی آرام و سنتی است.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section">
        <div className="section-title">
          <h2>گالری رستوران</h2>
          <p>نگاهی به فضای سنتی شبستان</p>
        </div>
        <div className="gallery-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="gallery-item">
              <img src={`/images/gallery${i}.jpg`} alt="" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="section-title">
          <h2>تماس با ما</h2>
          <p>همیشه میزبان شما هستیم</p>
        </div>
        <div className="contact-container">
          <div className="contact-item">
            <i className="fa-solid fa-location-dot"></i>
            <h3>آدرس</h3>
            <p>تهران، خیابان ولیعصر، کوچه شبستان</p>
          </div>
          <div className="contact-item">
            <i className="fa-solid fa-phone"></i>
            <h3>تلفن</h3>
            <p>021-12345678</p>
          </div>
          <div className="contact-item">
            <i className="fa-solid fa-clock"></i>
            <h3>ساعات کاری</h3>
            <p>هر روز ۱۲ ظهر تا ۱۲ شب</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-logo">
          <i className="fa-solid fa-utensils"></i> رستوران سنتی شبستان
        </div>
        <p>طعم اصیل غذاهای ایرانی</p>
        <p>© تمامی حقوق محفوظ است.</p>
      </footer>

      {/* Cart Modal */}
      <div className={`cart-modal ${isCartOpen ? "show" : ""}`}>
        <div className="cart-box">
          <div className="cart-header">
            <h2>🛒 سبد سفارش</h2>
            <button
              className="close-cart"
              onClick={() => setIsCartOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">سبد سفارش شما خالی است.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <div className="cart-name">{item.name}</div>
                    <div className="cart-price">
                      {item.price.toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                  <div className="quantity">
                    <button onClick={() => decreaseQty(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                    <button
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="total-row">
              <span>جمع کل</span>
              <span>{totalCartPrice.toLocaleString("fa-IR")} تومان</span>
            </div>

            <div className="table-select">
              <label>شماره میز</label>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              >
                <option value="">انتخاب کنید</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="customer-info">
              <div className="form-group">
                <label>👤 نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>📞 شماره تماس</label>
                <input
                  type="tel"
                  maxLength={11}
                  placeholder="09123456789"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>📝 توضیحات سفارش</label>
                <textarea
                  rows={3}
                  placeholder="مثلاً بدون پیاز، دوغ بدون یخ و ..."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button className="submit-order" onClick={handleSubmitOrder}>
              ثبت سفارش
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div className={`success-modal ${isSuccessOpen ? "show" : ""}`}>
        <div className="success-box">
          <i className="fa-solid fa-circle-check"></i>
          <h2>سفارش شما ثبت شد</h2>
          <p>از اینکه رستوران سنتی شبستان را انتخاب کردید سپاسگزاریم.</p>
          <button onClick={() => setIsSuccessOpen(false)}>متوجه شدم</button>
        </div>
      </div>

      {/* Scroll To Top */}
      <button
        className={`scroll-top ${showScrollTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-angle-up"></i>
      </button>

      {/* Toast Component */}
      {toastMessage && (
        <div className="toast show">
          <i className="fa-solid fa-circle-check"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
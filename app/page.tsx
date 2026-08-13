"use client";

import { useState, useEffect } from "react";
import { useCart } from "./hooks/useCart";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Hero from "./components/Hero";
import WelcomeScreen from "./components/WelcomeScreen";
import Header from "./components/Header";
import Foods from "./components/Foods";
import CartButton from "./components/CartButton";
import SpecialChef from "./components/SpecialChef";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import SuccessModal from "./components/SuccessModal";
import ScrollTop from "./components/ScrollTop";
import Toast from "./components/Toast";

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartState = useCart();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAddToCart = (id: number) => {
    cartState.addToCart(id, (productName) => {
      showToast(`${productName} به سبد سفارش اضافه شد`);
    });
  };

  return (
    <>
      <WelcomeScreen />
      <Header />
      <Hero />
      <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Foods searchQuery={searchQuery} currentCategory={currentCategory} addToCart={handleAddToCart} />
      <CartButton setIsCartOpen={setIsCartOpen} totalCartCount={cartState.totalCartCount} />
      <SpecialChef addToCart={handleAddToCart} />
      <About />
      <Gallery />
      <Contact />
      <Footer />
      <CartModal
        cart={cartState.cart}
        isCartOpen={isCartOpen}
        totalCartPrice={cartState.totalCartPrice}
        increaseQty={cartState.increaseQty}
        decreaseQty={cartState.decreaseQty}
        removeItem={cartState.removeItem}
        clearCart={cartState.clearCart}
        showToast={showToast}
        setIsCartOpen={setIsCartOpen}
        setIsSuccessOpen={setIsSuccessOpen}
      />
      <SuccessModal isSuccessOpen={isSuccessOpen} setIsSuccessOpen={setIsSuccessOpen} />
      <ScrollTop showScrollTop={showScrollTop} />
      <Toast toastMessage={toastMessage} />
    </>
  );
}
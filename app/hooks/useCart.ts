import { useState, useEffect } from "react";
import { products, Product } from "../data/products";

export interface CartItem extends Product {
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const addToCart = (id: number, onSuccess?: (name: string) => void) => {
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
    if (onSuccess) onSuccess(targetProduct.name);
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

  const clearCart = () => saveCart([]);

  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalCartPrice,
    totalCartCount,
  };
}
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const CART_KEY = 'freshgo_cart';

const formatPrice = (value: number) => `Rs. ${value.toFixed(2)}`;

const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const saveCartItems = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loaded = getCartItems();
    setItems(loaded);
  }, []);

  const updateItems = (next: CartItem[]) => {
    setItems(next);
    saveCartItems(next);
  };

  const handleRemove = (id: number) => {
    const next = items.filter((item) => item.id !== id);
    updateItems(next);
  };

  const handleChangeQuantity = (id: number, delta: number) => {
    const next = items
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateItems(next);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50">
      {/* Top bar (aligned with other pages) */}
      <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur border-b border-amber-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-900 text-white shadow-md text-xl">
              🍞
            </span>
            <span className="text-lg font-bold tracking-wide text-amber-900">
              FreshGo
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-amber-100 rounded-full px-3 py-1 shadow-sm text-sm font-medium text-amber-900">
            <Link
              href="/"
              className="px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
            >
              Contact
            </Link>
            <span className="px-3 py-1 rounded-full bg-amber-900 text-white shadow">
              Cart
            </span>
          </nav>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link
              href="/login"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-full border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex px-3 py-1.5 rounded-full bg-amber-900 text-white hover:bg-amber-800 transition-colors shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
            Shopping Cart
          </h1>
          <p className="text-sm md:text-base text-amber-900/80">
            Review your selected bakery items before checkout.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] items-start">
          {/* Cart items */}
          <div className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-4 md:p-6 space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-amber-900/80">
                Your cart is currently empty.{' '}
                <Link
                  href="/products"
                  className="font-semibold text-amber-900 hover:text-amber-700 underline"
                >
                  Browse products
                </Link>
                .
              </p>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 sm:gap-4 border-b border-amber-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-amber-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${item.img}')` }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-1 text-sm text-amber-900">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="font-semibold">{item.name}</h2>
                          <p className="text-xs text-amber-900/70">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-amber-700 hover:text-amber-900"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <div className="inline-flex items-center rounded-full border border-amber-200 bg-white/90 shadow-sm text-xs">
                          <button
                            type="button"
                            className="px-2 py-1 border-r border-amber-100 hover:bg-amber-50"
                            onClick={() => handleChangeQuantity(item.id, -1)}
                          >
                            −
                          </button>
                          <span className="min-w-[2.5rem] text-center px-2 py-1">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-2 py-1 border-l border-amber-100 hover:bg-amber-50"
                            onClick={() => handleChangeQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Summary */}
          <aside className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-5 md:p-6 space-y-4 text-sm text-amber-900">
            <h2 className="text-lg font-semibold text-amber-900">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Service fee (5%)</span>
                <span>{formatPrice(serviceFee)}</span>
              </div>
              <div className="border-t border-amber-100 pt-2 mt-1 flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-amber-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-800"
            >
              Proceed to checkout
            </Link>
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center rounded-full border border-amber-300 px-4 py-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
            >
              Continue shopping
            </Link>
          </aside>
        </section>
      </main>
    </div>
  );
}



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

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const loaded = getCartItems();
    setItems(loaded);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) return;

    // In a real app, you'd post to an API here. For now we just clear the cart and show confirmation.
    saveCartItems([]);
    setItems([]);
    setShowConfirmation(true);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceFee = Math.round(subtotal * 0.05);
  const deliveryFee = subtotal > 0 ? 300 : 0;
  const total = subtotal + serviceFee + deliveryFee;

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
              href="/cart"
              className="px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
            >
              Cart
            </Link>
            <span className="px-3 py-1 rounded-full bg-amber-900 text-white shadow">
              Checkout
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
        {/* Heading */}
        <section className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
            Checkout
          </h1>
          <p className="text-sm md:text-base text-amber-900/80">
            Complete your details to place your order.
          </p>
        </section>

        {/* Layout: form + summary */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] items-start">
          {/* Checkout form */}
          <div className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-5 md:p-7 space-y-6">
            <h2 className="text-lg md:text-xl font-semibold text-amber-900">
              Delivery details
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                    placeholder="+94 ..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-amber-900"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-amber-900"
                >
                  Delivery address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 resize-y"
                  placeholder="Street, city, postal code"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="deliveryTime"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Preferred delivery time
                  </label>
                  <select
                    id="deliveryTime"
                    name="deliveryTime"
                    className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                  >
                    <option value="anytime">Anytime</option>
                    <option value="morning">Morning (7 AM – 11 AM)</option>
                    <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
                    <option value="evening">Evening (5 PM – 8 PM)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Order notes (optional)
                  </label>
                  <input
                    id="notes"
                    name="notes"
                    type="text"
                    className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                    placeholder="e.g. Gate code, extra instructions"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-semibold text-amber-900">
                  Payment method
                </h3>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <label className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white/95 px-3 py-2 cursor-pointer hover:bg-amber-50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      defaultChecked
                      className="h-4 w-4 text-amber-900"
                    />
                    <span className="text-amber-900">Credit / Debit card</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white/95 px-3 py-2 cursor-pointer hover:bg-amber-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      className="h-4 w-4 text-amber-900"
                    />
                    <span className="text-amber-900">Cash on delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-amber-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-800"
              >
                Place order
              </button>
            </form>
          </div>

          {/* Order summary */}
          <aside className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-5 md:p-6 space-y-4 text-sm text-amber-900">
            <h2 className="text-lg font-semibold text-amber-900">
              Order summary
            </h2>

            {items.length === 0 ? (
              <p className="text-sm text-amber-900/80">
                Your cart is empty.{' '}
                <Link
                  href="/products"
                  className="font-semibold text-amber-900 hover:text-amber-700 underline"
                >
                  Add some items first
                </Link>
                .
              </p>
            ) : (
              <>
                <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 border-b border-amber-100 pb-2 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-amber-100">
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${item.img}')` }}
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-amber-900">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-amber-900/70">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-amber-100 pt-3 mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Service fee (5%)</span>
                    <span>{formatPrice(serviceFee)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="border-t border-amber-100 pt-2 mt-1 flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </>
            )}

            <Link
              href="/cart"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-amber-300 px-4 py-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
            >
              Back to cart
            </Link>
          </aside>
        </section>
      </main>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-white/95 shadow-2xl border border-amber-100 p-6 md:p-7 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
              ✅
            </div>
            <h2 className="text-xl font-semibold text-amber-900">
              Order placed successfully!
            </h2>
            <p className="text-sm text-amber-900/80">
              Thank you for ordering with FreshGo. We&apos;ve received your order and
              will start preparing your fresh bakes shortly.
            </p>
            <div className="space-y-2 text-sm text-amber-900/80">
              <p>
                A confirmation email will be sent to you with the order details
                and expected delivery time.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
              <Link
                href="/products"
                className="flex-1 inline-flex items-center justify-center rounded-full border border-amber-300 px-4 py-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                Continue shopping
              </Link>
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center rounded-full bg-amber-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                Go to home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



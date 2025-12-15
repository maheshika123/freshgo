'use client';

import Link from 'next/link';
import { useState } from 'react';

const products = [
  { title: 'Cinnamon Roll', price: 'Rs. 300.00', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80' },
  { title: 'Chocolate Cake', price: 'Rs. 4000.00', img: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd8b?auto=format&fit=crop&w=400&q=80' },
  { title: 'Croissant', price: 'Rs. 1000.00', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
  { title: 'Sourdough bread', price: 'Rs. 1200.00', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur border-b border-amber-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-900 text-white shadow-md text-xl">
              🍞
            </span>
            <span className="text-lg font-bold tracking-wide text-amber-900">
              FreshGo
            </span>
          </Link>

          {/* Primary nav */}
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-amber-100 rounded-full px-3 py-1 shadow-sm text-sm font-medium text-amber-900">
            <Link
              href="/"
              className="px-3 py-1 rounded-full bg-amber-900 text-white shadow hover:bg-amber-800 transition-colors"
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
          </nav>

          {/* Auth / cart + mobile menu button */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm font-semibold">
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
            <button
              type="button"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-amber-900 border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors md:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              ☰
            </button>
            <Link
              href="/cart"
              className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-amber-900 border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors"
              aria-label="View cart"
            >
              🛒
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-amber-100 bg-amber-50/95 backdrop-blur">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 text-sm font-medium text-amber-900">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg bg-amber-900 text-white shadow"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-3 py-2 rounded-lg hover:bg-amber-100"
                onClick={() => setMobileOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-lg hover:bg-amber-100"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-lg hover:bg-amber-100"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-2 flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex-1 px-3 py-2 rounded-lg border border-amber-300 text-center hover:bg-amber-100"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 px-3 py-2 rounded-lg bg-amber-900 text-white text-center hover:bg-amber-800"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-10">
        {/* Hero */}
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 leading-tight">
              Freshly Baked Goodness Delivered to You
            </h1>
            <p className="text-amber-900/80 text-base">
              Experience the taste of our delicious, handcrafted baked goods.
            </p>
            <Link
              href="/products"
              className="inline-flex bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              Shop now
            </Link>
          </div>
          <div className="relative w-full h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80')" }}
            />
            <div className="absolute inset-0 bg-amber-900/15" />
          </div>
        </section>

        {/* Special banner */}
        <section className="bg-white/80 backdrop-blur rounded-lg border border-amber-100 shadow-sm px-4 py-3">
          <p className="text-amber-900 font-semibold text-sm">
            🎉 This Week&apos;s Special: 10% Off on All Croissants!
          </p>
        </section>

        {/* Product grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-900">Our Production</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((item) => (
              <div key={item.title} className="bg-white/80 backdrop-blur rounded-lg border border-amber-100 shadow-sm overflow-hidden flex flex-col">
                <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url('${item.img}')` }} />
                <div className="p-3 space-y-1 flex-1">
                  <p className="text-sm font-semibold text-amber-900">{item.title}</p>
                  <p className="text-xs text-amber-900/70">{item.price}</p>
                  <Link
                    href="/products"
                    className="mt-2 inline-flex items-center justify-center bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold px-3 py-2 rounded shadow-sm transition-colors"
                  >
                    Add to cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Link
              href="/products"
              className="inline-flex bg-purple-200 hover:bg-purple-300 text-purple-900 font-semibold px-4 py-2 rounded shadow-sm transition-colors"
            >
              View All Products
            </Link>
          </div>
        </section>

        {/* About section */}
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center bg-white/80 backdrop-blur rounded-lg border border-amber-100 shadow-sm p-6">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-amber-900">About us</h2>
            <p className="text-sm text-amber-900/80 leading-relaxed">
              Welcome to our bakery, where tradition meets quality. We take pride in baking fresh,
              delicious pastries, breads, and cakes every day. Our passion for quality ingredients
              and time-tested recipes ensures that every bite is a taste of happiness.
            </p>
          </div>
          <div className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80')" }}
            />
            <div className="absolute inset-0 bg-amber-900/10" />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-50 mt-12">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">FreshGo Bakery</h3>
            <p className="text-sm text-amber-100/80">
              Handcrafted breads, pastries, and cakes baked fresh daily with
              quality ingredients and a passion for flavor.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/register" className="hover:text-white">Register</Link></li>
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li>📞 +94 112 342 7896</li>
              <li>✉️ info@bekers.com</li>
              <li>Opening hours:</li>
              <li>Mon-Sat 7:00 AM - 9 PM</li>
              <li>Sun 9 AM - 5 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Follow</h4>
            <div className="flex items-center gap-3 text-xl">
              <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-white">📘</Link>
              <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-white">📸</Link>
              <Link href="https://tiktok.com" aria-label="TikTok" className="hover:text-white">🎵</Link>
            </div>
            <p className="mt-3 text-sm text-amber-100/80">
              Join our community for offers, new bakes, and seasonal specials.
            </p>
          </div>
        </div>
        <div className="border-t border-amber-800/70">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-amber-100/80 gap-2">
            <span>© {new Date().getFullYear()} FreshGo. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

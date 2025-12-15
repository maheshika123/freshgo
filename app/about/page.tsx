'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50">
      {/* Top bar (aligned with home/products) */}
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
            <span className="px-3 py-1 rounded-full bg-amber-900 text-white shadow">
              About
            </span>
            <Link
              href="/contact"
              className="px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
            >
              Contact
            </Link>
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

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        {/* Hero / intro */}
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 leading-tight">
              About FreshGo Bakery
            </h1>
            <p className="text-sm md:text-base text-amber-900/80 leading-relaxed">
              At FreshGo, we believe that every day deserves to start with the
              comforting aroma of freshly baked bread. Our bakery blends
              time‑honoured recipes with modern techniques to bring you
              handcrafted breads, pastries, and cakes made with care.
            </p>
            <p className="text-sm md:text-base text-amber-900/80 leading-relaxed">
              From the first loaf we baked, our goal has been simple: to create
              honest food with real ingredients, baked fresh daily, and served
              with a warm smile.
            </p>
          </div>
          <div className="relative w-full h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-amber-900/20" />
          </div>
        </section>

        {/* Values */}
        <section className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-6 md:p-8 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-amber-900">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm text-amber-900/90">
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-900">Quality Ingredients</h3>
              <p>
                We carefully select flours, butter, chocolate, and seasonal
                fruits to ensure every bake tastes as good as it looks.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-900">Handcrafted Daily</h3>
              <p>
                Our bakers start early each morning, shaping dough by hand and
                baking in small batches for maximum freshness.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-amber-900">Community First</h3>
              <p>
                We&apos;re proud to be a neighbourhood bakery, supporting local
                suppliers and creating a cozy space for our guests.
              </p>
            </div>
          </div>
        </section>

        {/* Story / timeline style */}
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-amber-900">
              Our Story
            </h2>
            <p className="text-sm md:text-base text-amber-900/80 leading-relaxed">
              FreshGo began as a small family oven, sharing loaves with
              neighbours and friends. What started as weekend baking quickly
              grew into a full‑time passion as more people fell in love with our
              sourdoughs, croissants, and cakes.
            </p>
            <p className="text-sm md:text-base text-amber-900/80 leading-relaxed">
              Today, our team of dedicated bakers and baristas works together to
              create a warm, welcoming experience—whether you&apos;re grabbing a
              quick coffee and pastry, or planning desserts for a special
              celebration.
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-6 md:p-7 space-y-4 text-sm text-amber-900">
            <div className="flex items-start gap-3">
              <span className="mt-1 text-lg">🥐</span>
              <div>
                <h3 className="font-semibold">From Oven to Online</h3>
                <p className="text-amber-900/80">
                  We built FreshGo to make it easier for you to enjoy your
                  favourite baked goods—whether you visit us in person or order
                  online for home delivery.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-lg">🚚</span>
              <div>
                <h3 className="font-semibold">Fresh Delivery</h3>
                <p className="text-amber-900/80">
                  Orders are baked and packed on the same day, so you receive
                  everything at peak freshness.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-lg">🎂</span>
              <div>
                <h3 className="font-semibold">Made for Celebrations</h3>
                <p className="text-amber-900/80">
                  From birthdays to office events, we offer custom cakes,
                  platters, and pastry boxes tailored to your occasion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-amber-900">
              Visit or contact us
            </h2>
            <p className="mt-1 text-sm md:text-base text-amber-900/80">
              Have a question, a special order, or feedback? We&apos;d love to
              hear from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex px-4 py-2 rounded-full bg-amber-900 text-white text-sm font-semibold hover:bg-amber-800 transition-colors shadow-sm"
            >
              Contact page
            </Link>
            <Link
              href="/products"
              className="inline-flex px-4 py-2 rounded-full border border-amber-300 text-amber-900 text-sm font-semibold hover:bg-amber-100 transition-colors"
            >
              Browse products
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}



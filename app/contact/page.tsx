'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50">
      {/* Top bar (aligned with home/products/about) */}
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
            <span className="px-3 py-1 rounded-full bg-amber-900 text-white shadow">
              Contact
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

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        {/* Intro */}
        <section className="max-w-2xl space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
            Contact Us
          </h1>
          <p className="text-sm md:text-base text-amber-900/80 leading-relaxed">
            We&apos;d love to hear from you—whether you have a question about our
            products, want to place a custom order, or simply want to share
            feedback about your FreshGo experience.
          </p>
        </section>

        {/* Layout: form + info */}
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
          {/* Contact form */}
          <div className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-amber-900 mb-4">
              Send us a message
            </h2>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Email
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                    placeholder="+94 ..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-amber-900"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                    placeholder="e.g. Custom cake order"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-amber-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-sm text-amber-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 resize-y"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-800"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Contact details / map placeholder */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-6 md:p-7 text-sm text-amber-900">
              <h2 className="text-lg font-semibold text-amber-900 mb-3">
                Visit our bakery
              </h2>
              <p className="mb-3 text-amber-900/80">
                123 Bakery Street<br />
                Colombo, Sri Lanka
              </p>
              <h3 className="mt-2 font-semibold">Opening hours</h3>
              <p className="text-amber-900/80 leading-relaxed">
                Mon–Sat: 7:00 AM – 9:00 PM<br />
                Sun: 9:00 AM – 5:00 PM
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-2xl border border-amber-100 shadow-sm p-6 md:p-7 text-sm text-amber-900 space-y-3">
              <h2 className="text-lg font-semibold text-amber-900">
                Contact details
              </h2>
              <p className="text-amber-900/85">
                📞 +94 112 342 7896<br />
                ✉️ info@bekers.com
              </p>
              <div>
                <h3 className="font-semibold mb-1">Follow us</h3>
                <div className="flex items-center gap-3 text-lg">
                  <Link
                    href="https://facebook.com"
                    className="hover:scale-110 transition-transform"
                    aria-label="Facebook"
                  >
                    📘
                  </Link>
                  <Link
                    href="https://instagram.com"
                    className="hover:scale-110 transition-transform"
                    aria-label="Instagram"
                  >
                    📸
                  </Link>
                  <Link
                    href="https://tiktok.com"
                    className="hover:scale-110 transition-transform"
                    aria-label="TikTok"
                  >
                    🎵
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur rounded-2xl border border-amber-100 shadow-inner p-4 h-40 md:h-48 flex items-center justify-center text-xs text-amber-900/70">
              Map placeholder – integrate Google Maps or your preferred map
              service here.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}



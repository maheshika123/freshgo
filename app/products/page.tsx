'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = ['All', 'Bread', 'Pastries', 'Cakes', 'Cookies', 'Breakfast'];

const products = [
  {
    id: 1,
    name: 'Sourdough Loaf',
    category: 'Bread',
    price: 'Rs. 1200.00',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    description: 'Slow-fermented sourdough with a crisp crust and airy crumb.',
  },
  {
    id: 2,
    name: 'Butter Croissant',
    category: 'Pastries',
    price: 'Rs. 450.00',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Classic flaky croissant made with French butter.',
  },
  {
    id: 3,
    name: 'Chocolate Cake Slice',
    category: 'Cakes',
    price: 'Rs. 650.00',
    img: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd8b?auto=format&fit=crop&w=600&q=80',
    description: 'Rich dark chocolate sponge layered with ganache.',
  },
  {
    id: 4,
    name: 'Cinnamon Roll',
    category: 'Pastries',
    price: 'Rs. 380.00',
    img: 'https://images.unsplash.com/photo-1518131678677-bc1a4dca4ccb?auto=format&fit=crop&w=600&q=80',
    description: 'Soft roll swirled with cinnamon sugar and topped with glaze.',
  },
  {
    id: 5,
    name: 'Seeded Multigrain',
    category: 'Bread',
    price: 'Rs. 1350.00',
    img: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80',
    description: 'Hearty multigrain loaf packed with seeds and fiber.',
  },
  {
    id: 6,
    name: 'Berry Muffin',
    category: 'Breakfast',
    price: 'Rs. 320.00',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'Moist muffin bursting with seasonal berries.',
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const CART_KEY = 'freshgo_cart';

const parsePrice = (price: string): number => {
  const numeric = price.replace(/[^\d.]/g, '');
  const value = Number(numeric);
  return Number.isNaN(value) ? 0 : value;
};

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

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryParam = searchParams.get('category');
  const activeCategory =
    activeCategoryParam && activeCategoryParam.length > 0
      ? activeCategoryParam.toLowerCase()
      : 'all';

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === activeCategory
        );

  const handleAddToCart = (product: (typeof products)[number]) => {
    if (typeof window === 'undefined') return;

    const current = getCartItems();
    const priceNumber = parsePrice(product.price);

    const existingIndex = current.findIndex((item) => item.id === product.id);
    if (existingIndex >= 0) {
      current[existingIndex] = {
        ...current[existingIndex],
        quantity: current[existingIndex].quantity + 1,
      };
    } else {
      current.push({
        id: product.id,
        name: product.name,
        price: priceNumber,
        quantity: 1,
        img: product.img,
      });
    }

    saveCartItems(current);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50">
      {/* Simple top bar aligned with home style */}
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
            <span className="px-3 py-1 rounded-full bg-amber-900 text-white shadow">
              Products
            </span>
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

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Heading & description */}
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
              Our Products
            </h1>
            <p className="mt-2 text-sm md:text-base text-amber-900/80 max-w-xl">
              Browse our selection of freshly baked breads, pastries, cakes and
              breakfast favorites. Everything is baked daily using the finest
              ingredients.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {categories.map((cat) => {
              const slug = cat.toLowerCase();
              const isActive =
                (slug === 'all' && activeCategory === 'all') ||
                activeCategory === slug;

              const href =
                slug === 'all'
                  ? '/products'
                  : `/products?category=${encodeURIComponent(slug)}`;

              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-4 py-1.5 rounded-full border bg-white/95 shadow-sm transition-colors text-xs sm:text-sm font-semibold ${
                    isActive
                      ? 'border-amber-900 text-amber-900 bg-amber-50 shadow-md'
                      : 'border-amber-200 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Product grid */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white/90 backdrop-blur rounded-xl border border-amber-100 shadow-sm overflow-hidden flex flex-col"
            >
              <div
                className="h-40 sm:h-44 bg-cover bg-center"
                style={{ backgroundImage: `url('${product.img}')` }}
              />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-semibold text-amber-900">
                    {product.name}
                  </h2>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-amber-900">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center justify-center bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-sm transition-colors"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Call to action */}
        <section className="mt-4 bg-white/90 backdrop-blur rounded-xl border border-amber-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-sm md:text-base font-semibold text-amber-900">
              Looking for a custom cake or large order?
            </h2>
            <p className="text-xs md:text-sm text-amber-900/80">
              Contact us and we&apos;ll help you design the perfect bake for your
              event.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex px-4 py-2 rounded-full bg-amber-900 text-white text-xs md:text-sm font-semibold hover:bg-amber-800 transition-colors shadow-sm self-start sm:self-auto"
          >
            Contact us
          </Link>
        </section>
      </main>
    </div>
  );
}


export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}


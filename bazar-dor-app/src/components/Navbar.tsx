"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
const useSession = () => ({ data: null });
const signOut = () => {};
import { User, LogOut, ShoppingBag } from "lucide-react";

interface Category {
  slug: string;
  name: string;
  icon?: string;
}

interface TickerItem {
  id: string;
  name: string;
  emoji: string;
  price: string;
  unit: string;
  change: string;
  isUp: boolean;
}

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([
    { slug: "chal", name: "চাল" },
    { slug: "dal", name: "ডাল" },
    { slug: "tel", name: "তেল" },
    { slug: "sobji", name: "সবজি" },
    { slug: "mach", name: "মাছ" },
    { slug: "mangsho", name: "মাংস" },
    { slug: "dim-dudh", name: "ডিম-দুধ" },
    { slug: "mosla", name: "মসলা" },
  ]);

  const [tickerItems, setTickerItems] = useState<TickerItem[]>([
    { id: "1", name: "স্বর্ণমাছি চাল", emoji: "🍚", price: "১৪৮ টাকা", unit: "প্রতি কেজি", change: "▲ ২.১%", isUp: true },
    { id: "2", name: "মিনিকেট চাল", emoji: "🍚", price: "৯৯ টাকা", unit: "প্রতি কেজি", change: "▼ ২.৯%", isUp: false },
    { id: "3", name: "বাটাম সাইজ চাল", emoji: "🍚", price: "৬৬ টাকা", unit: "প্রতি কেজি", change: "▲ ৩.১%", isUp: true },
    { id: "4", name: "মসুর ডাল", emoji: "🫘", price: "১৪২ টাকা", unit: "প্রতি কেজি", change: "▲ ২.৯%", isUp: true },
    { id: "5", name: "ছোলা", emoji: "🫘", price: "১২০ টাকা", unit: "প্রতি কেজি", change: "▲ ১.৫%", isUp: true },
  ]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        else if (data.categories) setCategories(data.categories);
      })
      .catch(() => {});

    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];
        if (items.length > 0) {
          const formatted = items.slice(0, 10).map((item: any, idx: number) => ({
            id: item.id || idx,
            name: item.name || "পণ্য",
            emoji: item.emoji || "🛒",
            price: item.price || "১০০ টাকা",
            unit: item.unit || "প্রতি কেজি",
            change: item.change || "▲ ২.১%",
            isUp: (item.change || "▲").includes("▲"),
          }));
          setTickerItems(formatted);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm w-full">
      {/* Top Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">বাজার দর</h1>
            <p className="text-xs text-gray-500">বুধবার, ৭ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-sm hover:bg-emerald-100 transition"
              >
                <User className="w-4 h-4" />
                <span>{session?.user?.name || "প্রোফাইল"}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-red-50 hover:text-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">লগ আউট</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700 transition"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      
      <nav className="w-full border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-3 min-w-max">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition flex-shrink-0 ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                  }`}
                >
                  <span className="text-base">{cat.icon || "📦"}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Marquee Ticker Row */}
      <div className="bg-gray-50 border-t border-b border-gray-200 overflow-hidden py-2 text-xs w-full">
        <div className="animate-marquee flex gap-8 items-center">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 text-gray-700 shrink-0">
              <span>{item.emoji}</span>
              <span className="font-semibold">{item.name}</span>
              <span className="text-gray-500">{item.price}/{item.unit}</span>
              <span className={item.isUp ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
                {item.change}
              </span>
              <span className="text-gray-300 ml-4">|</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
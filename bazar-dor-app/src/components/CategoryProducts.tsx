"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Product {
  name: string;
  unit?: string;
  price: number;
  change: number;
  category?: string;
}

const CATEGORIES_MAP: Record<string, { label: string; icon: string; keyword: string }> = {
  chal: { label: "চাল", icon: "🍚", keyword: "চাল" },
  dal: { label: "ডাল", icon: "🫘", keyword: "ডাল" },
  oil: { label: "তেল", icon: "🧴", keyword: "তেল" },
  veg: { label: "সবজি", icon: "🥦", keyword: "সবজি" },
  fish: { label: "মাছ", icon: "🐟", keyword: "মাছ" },
  meat: { label: "মাংস", icon: "🍗", keyword: "মাংস" },
  egg: { label: "ডিম-দুধ", icon: "🥚", keyword: "ডিম" },
  spice: { label: "মসলা", icon: "🧄", keyword: "মসলা" },
};

export default function CategoryProducts() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category") || "chal";

  const [activeCategory, setActiveCategory] = useState(categoryQuery);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  // Sync state when URL query changes
  useEffect(() => {
    if (categoryQuery) {
      setActiveCategory(categoryQuery);
    }
  }, [categoryQuery]);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor");
        const json = await res.json();

        let extracted: Product[] = [];
        function parseData(data: any) {
          if (!data) return;
          if (Array.isArray(data)) {
            data.forEach((item) => {
              if (item && typeof item === "object") {
                if ("name" in item && ("price" in item || "currentPrice" in item)) {
                  extracted.push({
                    name: item.name,
                    unit: item.unit || "প্রতি কেজি",
                    price: Number(item.price || item.currentPrice || 0),
                    change: Number(item.change || item.percentageChange || 0),
                    category: item.category || "",
                  });
                } else {
                  parseData(item);
                }
              }
            });
          } else if (typeof data === "object") {
            Object.values(data).forEach((val) => parseData(val));
          }
        }

        parseData(json);

        // Fallback mockup items matching Screenshot 2 layout
        if (extracted.length === 0) {
          extracted = [
            { name: "স্বর্ণাদ্ধি চাল", unit: "প্রতি কেজি", price: 148, change: 2.1, category: "চাল" },
            { name: "মিনিকেট চাল", unit: "প্রতি কেজি", price: 99, change: -2.3, category: "চাল" },
            { name: "নাজির চাল", unit: "প্রতি কেজি", price: 74, change: 0.0, category: "চাল" },
            { name: "বটিম সাইজ চাল", unit: "প্রতি কেজি", price: 66, change: 3.1, category: "চাল" },
            { name: "মসুর ডাল", unit: "প্রতি কেজি", price: 142, change: 2.9, category: "ডাল" },
            { name: "সয়াবিন তেল", unit: "প্রতি লিটার", price: 192, change: 1.8, category: "তেল" },
          ];
        }

        setAllProducts(extracted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const currentMeta = CATEGORIES_MAP[activeCategory] || CATEGORIES_MAP["chal"];

  // Filter products by category keyword
  const filteredProducts = allProducts.filter((p) => {
    return (
      p.name.toLowerCase().includes(currentMeta.keyword.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(currentMeta.keyword.toLowerCase()))
    );
  });

  // Sorting logic (সাজান)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  if (loading) return <div className="text-center py-16 text-gray-400">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Screenshot 2 Header Banner Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border border-emerald-100">
            {currentMeta.icon}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{currentMeta.label}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {sortedProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* Sorting Control Bar (সাজান অপশন) */}
      <div className="flex items-center justify-between bg-white px-6 py-3.5 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500 font-medium">
          মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>সাজান</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-xl px-3.5 py-1.5 bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#137333]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">কম দাম থেকে বেশি</option>
            <option value="price-high">বেশি দাম থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product, index) => {
          const isUp = product.change > 0;
          const isZero = product.change === 0;
          const productSlug = encodeURIComponent(product.name);

          return (
            <Link
              key={index}
              href={`/products/${productSlug}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl bg-gray-50 p-2 rounded-xl border border-gray-100 w-11 h-11 flex items-center justify-center">
                    {currentMeta.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-green-700 transition">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{product.unit || "প্রতি কেজি"}</p>
                  </div>
                </div>

                <div className="mt-4 pl-1">
                  <span className="text-xs text-gray-400 block">আজকের দাম</span>
                  <span className="text-lg font-extrabold text-gray-900">
                    {product.price} টাকা
                  </span>
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
                    isZero
                      ? "text-gray-500 bg-gray-100"
                      : isUp
                      ? "text-red-600 bg-red-50"
                      : "text-emerald-600 bg-emerald-50"
                  }`}
                >
                  {isZero ? "—" : isUp ? "▲" : "▼"} {Math.abs(product.change)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-16 text-gray-400 bg-white rounded-3xl border border-gray-100">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
        </div>
      )}

    </div>
  );
}
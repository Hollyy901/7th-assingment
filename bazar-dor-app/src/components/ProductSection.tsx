"use client";

import React, { useEffect, useState } from "react";

interface Product {
  name: string;
  unit?: string;
  price: number;
  change: number;
}

// Helper function to map product names to matching icons/emojis
function getProductIcon(name: string) {
  const cleanName = name ? name.toLowerCase() : "";
  if (cleanName.includes("পেঁয়াজ") || cleanName.includes("পেয়াজ")) return "🧅";
  if (cleanName.includes("আদা")) return "🫚";
  if (cleanName.includes("বেগুন")) return "🍆";
  if (cleanName.includes("রুই") || cleanName.includes("মাছ") || cleanName.includes("ইলিশ") || cleanName.includes("কাতলা") || cleanName.includes("তেলাপিয়া")) return "🐟";
  if (cleanName.includes("ডিম")) return "🥚";
  if (cleanName.includes("মাখন") || cleanName.includes("দুধ") || cleanName.includes("ডেইরি")) return "🧈";
  if (cleanName.includes("কাঁচামরিচ") || cleanName.includes("মরিচ")) return "🌶️";
  if (cleanName.includes("রসুন")) return "🧄";
  if (cleanName.includes("আলু")) return "🥔";
  if (cleanName.includes("ডাল") || cleanName.includes("ছোলা")) return "🫘";
  if (cleanName.includes("চাল")) return "🍚";
  if (cleanName.includes("তেল")) return "🧴";
  if (cleanName.includes("মাংস") || cleanName.includes("মুরগি") || cleanName.includes("গরু") || cleanName.includes("খাসি") || cleanName.includes("হাঁস")) return "🍗";
  return "🛒"; 
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        setLoading(true);
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor");
        const json = await res.json();
        
        let allItems: Product[] = [];

        function extractItems(data: any) {
          if (!data) return;
          if (Array.isArray(data)) {
            data.forEach((item) => {
              if (item && typeof item === "object") {
                if ("name" in item && ("price" in item || "currentPrice" in item)) {
                  allItems.push({
                    name: item.name,
                    unit: item.unit || "প্রতি কেজি",
                    price: Number(item.price || item.currentPrice || 0),
                    change: Number(item.change || item.percentageChange || 0),
                  });
                } else {
                  extractItems(item);
                }
              }
            });
          } else if (typeof data === "object") {
            Object.values(data).forEach((val) => {
              extractItems(val);
            });
          }
        }

        extractItems(json);

        if (allItems.length === 0) {
          allItems = [
            { name: "পেঁয়াজ", unit: "প্রতি কেজি", price: 48, change: 2.5 },
            { name: "আদা", unit: "প্রতি কেজি", price: 85, change: 1.2 },
            { name: "বেগুন", unit: "প্রতি কেজি", price: 88, change: 0.8 },
            { name: "ডিম", unit: "প্রতি হালি", price: 142, change: 0.5 },
            { name: "মসুর ডাল", unit: "প্রতি কেজি", price: 142, change: 2.1 },
            { name: "সরিষার তেল", unit: "প্রতি লিটার", price: 192, change: 1.8 },
            { name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: 92, change: -12.4 },
            { name: "রসুন", unit: "প্রতি কেজি", price: 125, change: -4.5 },
            { name: "আলু", unit: "প্রতি কেজি", price: 60, change: -2.1 },
          ];
        }

        setProducts(allItems);
      } catch (err) {
        console.error("Failed to load full bazar data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const increasedProducts = products.filter((p) => p.change > 0);
  const decreasedProducts = products.filter((p) => p.change < 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 text-gray-500 font-medium">
        বাজারের সব তথ্য সংগ্রহ করা হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* SECTION 1: আজ দাম বেড়েছে */}
      {increasedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 text-[#D32F2F] font-bold text-lg">
            <span>▲</span>
            <h2>আজ দাম বেড়েছে ({increasedProducts.length})</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {increasedProducts.map((item, idx) => (
              <ProductCard key={`inc-${idx}`} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: আজ দাম কমেছে */}
      {decreasedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 text-[#2E7D32] font-bold text-lg">
            <span>▼</span>
            <h2>আজ দাম কমেছে ({decreasedProducts.length})</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {decreasedProducts.map((item, idx) => (
              <ProductCard key={`dec-${idx}`} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: সব পণ্য */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">সব পণ্য ({products.length})</h2>
          <p className="text-xs text-gray-500">এ API থেকে প্রাপ্ত সকল ক্যাটাগরির পণ্যের সম্পূর্ণ তালিকা</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item, idx) => (
            <ProductCard key={`all-${idx}`} product={item} />
          ))}
        </div>
      </section>

    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isUp = product.change > 0;
  const isZero = product.change === 0;
  const icon = getProductIcon(product.name);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl bg-gray-50 p-1.5 rounded-xl border border-gray-100 flex items-center justify-center w-9 h-9">
            {icon}
          </span>
          <div>
            <h3 className="font-bold text-gray-800 text-base leading-snug">{product.name}</h3>
            <p className="text-xs text-gray-400">{product.unit || "প্রতি কেজি"}</p>
          </div>
        </div>
        
        <div className="mt-3 pl-1">
          <span className="text-xs text-gray-400 block">আজকের বাজার</span>
          <span className="text-lg font-extrabold text-gray-900">{product.price} টাকা</span>
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
    </div>
  );
}
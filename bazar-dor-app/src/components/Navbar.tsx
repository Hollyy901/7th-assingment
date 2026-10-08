"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const navCategories = [
  { id: "chal", label: "চাল", icon: "🍚", query: "chal" },
  { id: "dal", label: "ডাল", icon: "🫘", query: "dal" },
  { id: "oil", label: "তেল", icon: "🧴", query: "oil" },
  { id: "veg", label: "সবজি", icon: "🥦", query: "veg" },
  { id: "fish", label: "মাছ", icon: "🐟", query: "fish" },
  { id: "meat", label: "মাংস", icon: "🍗", query: "meat" },
  { id: "egg", label: "ডিম-দুধ", icon: "🥚", query: "egg" },
  { id: "spice", label: "মসলা", icon: "🧄", query: "spice" },
];

export default function Navbar() {
  const router = useRouter();

  const handleCategoryClick = (query: string) => {
    router.push(`/products?category=${query}`);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Navbar Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#0D8742] text-white p-2 rounded-xl font-bold text-lg">
            🛒
          </div>
          <div>
            <span className="font-extrabold text-xl text-gray-900">বাজার দর</span>
            <span className="block text-[10px] text-gray-400">মঙ্গলবারের বাজার দর আপডেট</span>
          </div>
        </Link>

        {/* User profile / Auth info placeholder */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <span>👤</span>
          <span>Rezwan</span>
        </div>
      </div>

      {/* Category Icon Strip Bar (from your screenshot) */}
      <div className="bg-[#F8F9FA] border-t border-gray-100 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto scrollbar-none">
          {navCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.query)}
              className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-[#0D8742] transition whitespace-nowrap bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm active:scale-95"
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
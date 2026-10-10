"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface MarketPrice {
  marketName: string;
  division: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

interface ProductDetail {
  name: string;
  category: string;
  currentPrice: number;
  priceChangePercentage: number;
  priceChangeAmount: number;
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  markets: MarketPrice[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const rawId = params?.id;
  const productName = rawId ? decodeURIComponent(Array.isArray(rawId) ? rawId[0] : rawId) : "বটম সাইজ চাল";

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const basePrices: Record<string, number> = {
      "স্বর্ণাদ্ধি চাল": 148,
      "মিনিকেট চাল": 99,
      "নাজির চাল": 74,
      "বটিম সাইজ চাল": 66,
      "বটম সাইজ চাল": 66,
      "মসুর ডাল": 142,
      "সয়াবিন তেল": 192
    };

    const price = basePrices[productName.trim()] || 66;

    const mockDetail: ProductDetail = {
      name: productName,
      category: "চাল",
      currentPrice: price,
      priceChangePercentage: 3.1,
      priceChangeAmount: 2,
      lowestPrice: price - 7,
      highestPrice: price + 7,
      averagePrice: price,
      markets: [
        { marketName: "মার্থ বাজার", division: "ময়মনসিংহ", minPrice: price - 7, maxPrice: price - 1, avgPrice: price - 4 },
        { marketName: "সদর বাজার", division: "রাজশাহী", minPrice: price - 6, maxPrice: price, avgPrice: price - 3 },
        { marketName: "বাজারহাট", division: "খুলনা", minPrice: price - 6, maxPrice: price + 1, avgPrice: price - 2.50 },
        { marketName: "বাসারঘাট বাজার", division: "রাজশাহী", minPrice: price - 6, maxPrice: price + 2, avgPrice: price - 2 },
        { marketName: "চৌর বাজার", division: "ময়মনসিংহ", minPrice: price - 6, maxPrice: price + 3, avgPrice: price - 1.50 },
        { marketName: "আমতলী বাজার", division: "চট্টগ্রাম", minPrice: price - 5, maxPrice: price + 3, avgPrice: price - 1 },
        { marketName: "ডবলগেট বাজার", division: "খুলনা", minPrice: price - 4, maxPrice: price + 3, avgPrice: price - 0.50 },
        { marketName: "চৌরাস্তা বাজার", division: "সিলেট", minPrice: price - 3, maxPrice: price + 4, avgPrice: price + 1 },
        { marketName: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", minPrice: price - 2, maxPrice: price + 4, avgPrice: price + 1.50 },
        { marketName: "চৌধগ্রাম বাজার", division: "চট্টগ্রাম", minPrice: price - 3, maxPrice: price + 7, avgPrice: price + 2 },
        { marketName: "আমবাজার", division: "সিলেট", minPrice: price - 2, maxPrice: price + 7, avgPrice: price + 2.50 },
        { marketName: "কারওয়ান বাজার", division: "ঢাকা", minPrice: price - 1, maxPrice: price + 7, avgPrice: price + 3 }
      ]
    };

    setProduct(mockDetail);
    setLoading(false);
  }, [productName]);

  if (loading) {
    return <div className="min-h-screen bg-[#f4f6f4] flex items-center justify-center text-gray-500">লোড হচ্ছে...</div>;
  }

  if (!product) return null;

  const isUp = product.priceChangePercentage >= 0;

  return (
    <div className="min-h-screen bg-[#f4f6f4] px-4 py-6 md:px-12">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 md:text-sm">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>›</span>
          <span className="text-gray-500">{product.category}</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Hero Card */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-gray-100 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c" 
                alt={product.name} 
                className="h-16 w-16 object-cover p-2 rounded-2xl"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-xs md:text-sm text-gray-500">প্রতি কেজি · {product.category}</p>
              <p className="mt-1 text-xs text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                <span className={isUp ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                  {isUp ? "বেড়েছে" : "কমেছে"}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto text-left md:text-right rounded-xl bg-gray-50 p-4 border border-gray-100">
            <span className="text-xs text-gray-500 block">আজকের দাম</span>
            <div className="flex items-baseline md:justify-end gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-gray-900">{product.currentPrice}</span>
              <span className="text-xs text-gray-600">টাকা / কেজি</span>
            </div>
            <div className={`mt-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              {isUp ? "▲" : "▼"} {Math.abs(product.priceChangePercentage)}%
            </div>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</span>
              <div className="text-xl font-bold text-green-600">{product.lowestPrice} টাকা</div>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">সর্বাধিক দাম</span>
              <div className="text-xl font-bold text-red-600">{product.highestPrice} টাকা</div>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium">গড় দাম</span>
              <div className="text-xl font-bold text-green-700">{product.averagePrice} টাকা</div>
              <p className="text-xs text-gray-400">প্রতি কেজি-এর हिसाबে</p>
            </div>
          </div>
        </div>

        {/* Market Table */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl bg-white border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500 bg-gray-50/50">
                  <th className="py-3 px-4 font-semibold">বাজার</th>
                  <th className="py-3 px-4 font-semibold">বিভাগ</th>
                  <th className="py-3 px-4 font-semibold">সর্বনিম্ন</th>
                  <th className="py-3 px-4 font-semibold">সর্বাধিক</th>
                  <th className="py-3 px-4 font-semibold">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                {product.markets.map((m, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-medium">{m.marketName}</td>
                    <td className="py-3.5 px-4 text-gray-600">{m.division}</td>
                    <td className="py-3.5 px-4">{m.minPrice} টাকা</td>
                    <td className="py-3.5 px-4">{m.maxPrice} টাকা</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{m.avgPrice} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
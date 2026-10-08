import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content Area */}
        <div className="max-w-xl z-10">
          {/* Date / Category Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#137333] px-3.5 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#137333]"></span>
            মঙ্গলবারের বাজার দর আপডেট
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle / Description */}
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Call-to-Action Button */}
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-[#0D8742] hover:bg-[#0a6c35] text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-base"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Image Area */}
        <div className="mt-8 md:mt-0 relative flex justify-center items-center w-full md:w-auto">
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]">
            <Image
              src="/bazar-hero.png"
              alt="Bazar Hero Basket"
              fill
              priority
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
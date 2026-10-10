import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs md:text-sm text-gray-500 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">বাজার দর</span>
          <span className="text-gray-300">—</span>
          <span>প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </div>
        <div className="text-gray-400 text-center md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}
"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/profile");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f6f4] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="text-center text-2xl font-bold text-gray-900">সাইন ইন</h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ইমেইল</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0a8733] py-2.5 text-sm font-semibold text-white transition hover:bg-[#087029]"
          >
            সাইন ইন
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="text-[#0a8733] font-medium hover:underline">
            সাইন আপ করুন
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:underline">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
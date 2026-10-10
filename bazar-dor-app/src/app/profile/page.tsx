"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="flex justify-center items-center min-h-screen">লোড হচ্ছে...</div>;
  }

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f4f6f4] p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={session.user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{session.user.name}</h2>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
          <button
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                  },
                },
              })
            }
            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition"
          >
            ← সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}
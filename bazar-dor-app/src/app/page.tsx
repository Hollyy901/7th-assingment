import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection"; // <-- Added this

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-20">
      <Navbar />        {/* 1. Shows at the top */}
      <Hero />          {/* 2. Shows right below the Navbar */}
      <ProductSection />{/* 3. Shows right below the Hero section */}
    </main>
  );
}
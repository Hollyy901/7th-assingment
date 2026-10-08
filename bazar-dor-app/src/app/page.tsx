import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-20">
      <Navbar />
      <Hero />
      <ProductSection />
    </main>
  );
}
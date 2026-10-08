import Navbar from "@/components/Navbar";
import CategoryProducts from "@/components/CategoryProducts";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-20">
      <Navbar />
      <CategoryProducts />
    </main>
  );
}
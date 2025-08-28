import Image from "next/image";
import ProductCard from "@/product/components/product-card";
import Footer from "@/shared/footer/footer";
import Navbar from "@/shared/nav-var/navar";
import Slide from "@/shared/slide/slide";


export default function Home() {
  return (
      <>
          <Navbar />
          <Slide />
          <div className="max-w-7xl mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
              </div>
          </div>
          <Footer />
      </>
  );
}

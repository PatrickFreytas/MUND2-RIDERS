import Footer from "@/shared/footer/footer";
import Slide from "@/shared/slide/slide";
import Brand from "@/shared/brand/brand";
import ProductList from "@/shared/components/layout-landing/product-list";
import ProductGreatList from "@/shared/components/layout-landing/product-great-slider";


export default function HomePage() {
  return (
    <>
      <Slide/>
      <Brand/>
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-center text-2xl font-extrabold tracking-wide">
          <span className="text-orange-500">PRODUCTOS</span> DESTACADOS
        </h2>
        <p className="text-center text-gray-400 mt-1 font-semibold tracking-wide">
          Nuestro mejores productos
        </p>
      </section>
      <ProductGreatList />
      <ProductList/>
      <Footer/>
    </>
  );
}
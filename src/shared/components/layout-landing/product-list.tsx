"use client";

import {
  useProductFormActions,
  useProductFormStore
} from "@/product/components/product-view-landing/product-searcher-form-provider";
import {getMany} from "@/product/api_repository";
import {toast} from "@/shared/components/ui/use-toast";
import {useEffect} from "react";
import ProductCard from "@/product/components/product-view-landing/product-card";

export default function ProductList() {
  const { setProducts } = useProductFormActions();
  const products = useProductFormStore((store) => store.products);

  const searchProduct = async () => {
    const response = await getMany();

    if (!response.success) {
      toast({
        title: "Error",
        variant: "destructive",
        description: response.message,
      });
      return;
    }

    setProducts(response.data);
  };

  useEffect(() => {
    searchProduct();
  }, []);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
      {products.length ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="text-center">No hay productos</div>
      )}
    </div>
  );
}

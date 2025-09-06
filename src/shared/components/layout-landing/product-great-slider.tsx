"use client";

import {toast} from "@/shared/components/ui/use-toast";
import {getMany} from "@/product/api_repository";
import {
  useProductFormActions,
  useProductFormStore
} from "@/product/components/product-view-landing/product-searcher-form-provider";
import {useEffect, useState} from "react";
import EmblaCarousel from "@/shared/components/layout-landing/embla-auto-scroll/embla-carousel";
import {EmblaOptionsType} from "embla-carousel";

export default function ProductGreatList() {
  const { setProducts } = useProductFormActions();
  const products = useProductFormStore((store) => store.products);

  const OPTIONS: EmblaOptionsType = { loop: true }

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

    const productsFilter = response.data.filter(product => product.categories.some(category => category.name === "Destacados"))
    setProducts(productsFilter);
  };


  useEffect(() => {
    searchProduct();
  }, []);

  return (
    <>
      <EmblaCarousel products={products} options={OPTIONS}/>
    </>
  );
}

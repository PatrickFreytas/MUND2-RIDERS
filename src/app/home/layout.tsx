import React from "react";
import {ProductFormProvider} from "@/product/components/product-view-landing/product-searcher-form-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductFormProvider>
      {children}
    </ProductFormProvider>
  );
}
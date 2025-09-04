"use client";

import {createContext, type ReactNode, useContext, useRef} from "react";
import {StoreApi, useStore} from "zustand";
import {
  Actions,
  createProductFormStore,
  initProductFormStore, ProductFormStore
} from "./store-products-searcher";
import {Product} from "@/product/types";

const ProductFormStoreContext = createContext<StoreApi<ProductFormStore> | null>(
  null,
);

interface ProductFormProviderProps {
  children: ReactNode;
}

export const ProductFormProvider = ({ children }: ProductFormProviderProps) => {
  const storeRef = useRef<StoreApi<ProductFormStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createProductFormStore(initProductFormStore());
  }

  return (
    <ProductFormStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductFormStoreContext.Provider>
  );
};

export const useProductFormStore = <T,>(
  selector: (store: ProductFormStore) => T,
): T => {
  const productFormStoreContext = useContext(ProductFormStoreContext);

  if (!productFormStoreContext) {
    throw new Error(
      "useOrderFormStore must be used within a ProductFormProvider",
    );
  }

  return useStore(productFormStoreContext, selector);
};

export const useProductFormActions = (): Actions => {

  const productFormStoreContext = useContext(ProductFormStoreContext);
  if (!productFormStoreContext) {
    throw new Error(
      "useOrderFormStore must be used within a OrderFormProvider",
    );
  }

  const setProducts = (productsStore: Product[]) => {
    productFormStoreContext.setState(() => {
      return { products: productsStore };
    });
  };

  return {
    setProducts,
  }
}
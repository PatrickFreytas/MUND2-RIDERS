import { createStore } from "zustand/vanilla";
import {
  type Product,
  type SingleProduct,
  SingleProductType,
} from "@/product/types";

type ProductFormStateBase = {
  open: boolean;
  performingAction: boolean;
};

type SingleProductFormState = ProductFormStateBase & {
  product: SingleProduct;
  productType: typeof SingleProductType;
  isNew: false;
};

type NewSingleProductFormState = ProductFormStateBase & {
  product: null;
  productType: typeof SingleProductType;
  isNew: true;
};

export type ProductFormState =
  | SingleProductFormState
  | NewSingleProductFormState

export type ProductFormActions = {
  setProduct: (product: Product) => void;
  resetProduct: (
    productType: typeof SingleProductType,
  ) => void;
  setOpen: (open: boolean) => void;
  setPerformingAction: (performingAction: boolean) => void;
};

export type ProductFormStore = ProductFormState & ProductFormActions;

export const defaultInitState: ProductFormState = {
  product: null,
  productType: SingleProductType,
  isNew: true,
  open: false,
  performingAction: false,
};

export const createProductFormStore = (
  initState: ProductFormState = { ...defaultInitState },
) => {
  return createStore<ProductFormStore>()((set) => ({
    ...initState,
    setProduct: (product) =>
      set(
        // The following line is a type assertion. We know that the product
        product.type === SingleProductType
          ? {
              product,
              isNew: false,
              open: true,
              performingAction: false,
              productType: product.type,
            }
          : {
              product,
              isNew: false,
              open: true,
              performingAction: false,
              productType: product.type,
            },
      ),
    resetProduct: (productType) =>
      set({
              product: null,
              productType: SingleProductType,
              isNew: true,
              open: false,
              performingAction: false,
            }
      ),
    setOpen: (open) => set({ open }),
    setPerformingAction: (performingAction: boolean) =>
      set({ performingAction }),
  }));
};

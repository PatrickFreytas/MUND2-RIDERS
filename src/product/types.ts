import { Category } from "@/category/types";

export type Photo = {
  id?: string;
  name: string;
  size: number;
  type: string;
  key: string;
  url: string;
  createdAt?: Date;
};

type ProductBase = {
  id?: string;
  companyId: string;
  name: string;
  price: number;
  sku?: string;
  description: string;
  photos?: Photo[];
  categories: Category[];
  updatedAt?: Date;
  createdAt?: Date;
};

export const SingleProductType = "SingleProduct";
export type TypeSingleProductType = typeof SingleProductType;

export type SingleProduct = ProductBase & {
  type: typeof SingleProductType;
  stock: number;
};

export type Product = SingleProduct;

type ProductTypeMap = {
  [SingleProductType]: SingleProduct;
};

export type ProductType = keyof ProductTypeMap;
export type InferProductType<T extends ProductType | undefined> =
  T extends ProductType ? ProductTypeMap[T] : Product;

export type ProductItem = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
};

export type ProductSearchParams = {
  sku?: string;
  companyId?: string;
  categories?: { id?: string };
};

// TODO: Add sort params for package product
export type ProductSortParams = {
  [P in keyof Omit<SingleProduct, "id" | "photos" | "categories">]?:
    | "asc"
    | "desc";
};

export type SortOptions = {
  [key in "name_asc" | "last_units_available" | "created_desc"]?: {
    name: string;
    value: ProductSortParams;
  };
};

export type SortKey = keyof SortOptions;

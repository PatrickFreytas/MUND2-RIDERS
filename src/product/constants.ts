import {
  SingleProduct,
  SingleProductType,
  SortOptions,
} from "@/product/types";

export const IMG_MAX_LIMIT = 1;

export const EMPTY_SINGLE_PRODUCT: SingleProduct = {
  companyId: "",
  type: SingleProductType,
  sku: "",
  name: "",
  price: 0,
  stock: 0,
  description: "",
  photos: [],
  categories: [],
};

export const sortOptions: SortOptions = {
  name_asc: { name: "Alfabéticamente", value: { name: "asc" } },
  last_units_available: {
    name: "Últimas unidades disponibles",
    value: { stock: "asc" },
  },
};

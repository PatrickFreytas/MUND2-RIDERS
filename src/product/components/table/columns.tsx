"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../data-table/cell-action";
import { Product, SingleProductType } from "@/product/types";
import { formatPrice } from "@/lib/utils";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "NOMBRE",
  },
  {
    accessorKey: "categories",
    header: "CATEGORÍAS",
    cell: ({ row }) =>
      row.original.categories.map((category) => category.name).join(", ") || "---",
  },
  {
    accessorKey: "stock",
    header: "CANTIDAD",
    cell: ({ row }) =>
      row.original.type === SingleProductType &&
      `${row.original.stock}`,
  },
  {
    accessorKey: "purchasePrice",
    header: "PRECIO DE VENTA",
    cell: ({ row }) => formatPrice(row.original.price),
  },
  {
    accessorKey: "sku",
    header: "CÓDIGO",
    cell: ({ row }) => row.original.sku || "---",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CellAction product={row.original} />,
  },
];

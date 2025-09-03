import CategoriesLoader from "@/category/components/categories-loader";
import {CategoryStoreProvider} from "@/category/components/category-store-provider";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
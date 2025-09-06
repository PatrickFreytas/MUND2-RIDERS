"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import Image from "next/image";
import {FaWhatsapp} from "react-icons/fa";
import {Product} from "@/product/types";
import {formatPrice} from "@/lib/utils";
import {Button} from "@/shared/components/ui/button";

export default function ProductCard({ product }: { product: Product }) {

  return (
    <Card
      key={product.id}
      className="w-full max-w-[260px] rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer">
      <CardContent className="p-4 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          <div className="relative w-[120px] h-[120px] mb-2">
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={product.photos?.[0]?.url || ""}
            />
          </div>
          <p className="text-sm text-center font-medium leading-tight line-clamp-2">
            {product.name}
          </p>
          <p className="text-lg font-semibold text-center text-black my-1">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-center text-gray-600">
            {product.categories.map((category) =>
              category.name === "KTM" ? "KTM" : ""
            )}
          </p>
        </div>

        <Button
          className="mt-3 inline-flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-md text-sm"
          onClick={() => window.open("https://wa.me/51999999999", "_blank")}
        >
          <FaWhatsapp className="text-lg"/>
          Comprar
        </Button>
      </CardContent>
    </Card>
  )
}
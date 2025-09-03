"use client";

import {Input} from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import Image from "next/image";
import {FaWhatsapp} from "react-icons/fa";



export default function ProductCard(){

  return (
    <div className="relative">
      <Card className="w-full max-w-[260px] rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="relative w-[120px] h-[120px] mb-2">
            <Image
              src="/globe.svg"
              alt="Kit de arrastre"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-center font-medium leading-tight line-clamp-2">
            KIT DE ARRASTRE
          </p>
          <p className="text-lg font-semibold text-center text-black my-1">
            S/ 200
          </p>
          <p className="text-sm text-center text-gray-600">
            KTM
          </p>
          <button
            className="mt-3 inline-flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-md text-sm"
            onClick={() => window.open("https://wa.me/51999999999", "_blank")}
          >
            <FaWhatsapp className="text-lg" />
            Comprar
          </button>
        </CardContent>
      </Card>

    </div>
  )
}
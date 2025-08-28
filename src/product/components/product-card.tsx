"use client";

import {Input} from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import Image from "next/image";



export default function ProductCard(){

  return (
      <div className="relative">
          <Card
          >
              <CardContent className="px-2">
                  <div className="mt-4 mx-auto relative w-[100px] h-[100px] rounded-md overflow-hidden">
                      aaa
                  </div>
                  <p className="text-center font-light leading-4 mt-2 line-clamp-4 group-hover:line-clamp-none">
                        aaaaaa

                  </p>
                  <p className="text-lg text-center font-medium my-1">
                        aaaaa
                  </p>
                  <p className="text-sm text-center mt-1">
                        aaaaa
                  </p>
              </CardContent>
          </Card>
      </div>
  )
}
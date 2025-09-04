"use client";

import Image from "next/image";
import {useState, useEffect} from "react";

export default function Slider() {
  const images = [
    "/banner_ktm.webp",
    "/file.svg",
    "/next.svg",
    "/window.svg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full overflow-hidden relative h-64 sm:h-80 md:h-96">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={src} alt={`Slide ${index + 1}`} fill className="object-cover"/>
        </div>
      ))}
    </div>
  );
}

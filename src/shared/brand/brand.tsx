'use client';

import Image from 'next/image';

const brands = [
    {
        name: 'Yamaha',
        imageUrl: '/globe.svg',
    },
    {
        name: 'Honda',
        imageUrl: '/globe.svg',
    },
    {
        name: 'Kawasaki',
        imageUrl: '/globe.svg',
    },
];

export default function Brand() {
    return (
        <section className="py-10 px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className="relative h-80 rounded-lg overflow-hidden shadow-lg group"
                    >
                        <Image
                            src={brand.imageUrl}
                            alt={brand.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h2 className="text-white text-2xl font-bold">{brand.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

}

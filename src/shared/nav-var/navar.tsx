import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-black text-white flex items-center px-6 py-3 gap-6 max-w-full">
            {/* Logo */}
            <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                    src="/globe.svg"
                    alt="Kit de arrastre"
                    fill
                    className="object-contain"
                />
            </div>


            <input
                type="text"
                placeholder=""
                className="flex-grow max-w-lg rounded-md px-4 py-2 bg-white text-black"
            />


            {/* Links */}
            <ul className="flex gap-6 text-base font-medium">
                <li className="cursor-pointer hover:text-orange-500 transition">Inicio</li>
                <li className="cursor-pointer hover:text-orange-500 transition">Productos</li>
                <li className="cursor-pointer hover:text-orange-500 transition">Contacto</li>
            </ul>
        </nav>
    );
}

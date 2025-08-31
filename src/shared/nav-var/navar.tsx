import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-black text-white flex items-center px-6 py-3 gap-6 max-w-full">

            <div className="w-28 h-12 relative flex-shrink-0">
                <Image
                    src="/globe.svg"
                    alt="Logo"
                    fill
                    className="object-contain"
                />
            </div>


            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                COMPRA TU RIDE
            </button>


            <input
                type="text"
                placeholder="Search"
                className="flex-grow max-w-lg rounded-md px-4 py-2 bg-white text-black"
            />





            <ul className="flex gap-6 text-base font-medium items-center">
                <li className="cursor-pointer hover:text-orange-600 transition">MUNDO <span className="text-red-600 font-bold">RID2</span> TU MEJOR OPCION</li>
                <li className="cursor-pointer">

                    <div className="w-6 h-6 bg-white rounded-full"></div>
                </li>
                <li className="cursor-pointer">

                    <div className="w-6 h-6 bg-white rounded-full"></div>
                </li>
                <li className="cursor-pointer">

                    <div className="w-6 h-6 bg-white rounded-full"></div>
                </li>
            </ul>

            {/* Bottom menu */}
            <ul className="flex gap-6 text-base font-bold absolute bottom-0 left-0 right-0 bg-black px-6 py-2 border-t border-gray-800">
                <li className="cursor-pointer hover:text-orange-600 transition">HELMETS</li>
                <li className="cursor-pointer hover:text-orange-600 transition">RIDING GEAR</li>
                <li className="cursor-pointer hover:text-orange-600 transition">PARTS</li>
                <li className="cursor-pointer hover:text-orange-600 transition">ACCESSORIES</li>
                <li className="cursor-pointer hover:text-orange-600 transition">TIRES</li>
                <li className="cursor-pointer hover:text-orange-600 transition">2025 GUIDES</li>
                <li className="cursor-pointer hover:text-red-600 transition">SALE</li>
                <li className="cursor-pointer hover:text-orange-600 transition">COMMON THREAD BLOG &gt;</li>
            </ul>
        </nav>
    );
}

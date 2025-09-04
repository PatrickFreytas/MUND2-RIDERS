import {LogoImage} from "@/shared/components/layout-landing/logo";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="bg-black text-white max-w-full">
        <div className="flex items-center justify-between px-6 py-3 gap-6">
          <div className="w-28 h-12 relative flex-shrink-0">
            <LogoImage/>
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
            <li className="cursor-pointer hover:text-orange-600 transition">
              MUNDO <span className="text-red-600 font-bold">RID2</span> TU MEJOR OPCION
            </li>
            <li className="cursor-pointer">
              <div
                className="w-28 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition text-black">
                Productos
              </div>
            </li>
            <li className="cursor-pointer">
              <div
                className="w-28 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition text-black">
                Servicios
              </div>
            </li>
            <li className="cursor-pointer">
              <div
                className="w-28 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition text-black">
                Contáctenos
              </div>
            </li>
          </ul>
        </div>

        <ul className="flex gap-6 text-base font-bold px-6 py-2 border-t border-gray-800">
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
    </div>
  );
}

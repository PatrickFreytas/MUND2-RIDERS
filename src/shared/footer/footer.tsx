export default function Footer() {
    return (
        <footer className="bg-black text-white py-10 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Sobre la tienda */}
                <div>
                    <h3 className="font-bold mb-4 uppercase">SOBRE LA TIENDA</h3>
                    <p className="flex items-start gap-2 mb-3">
                        <span>🏠</span>
                        MZ. X AV LAS PALMERAS PUCALLPA
                    </p>
                    <p className="flex items-center gap-2 mb-3">
                        <span>📞</span>
                        (01) 3515277 / 908898963
                    </p>
                    <p className="flex items-center gap-2">
                        <span>✉️</span>
                        mundorider@gmail.Com
                    </p>
                </div>


                <div>
                    <h3 className="font-bold mb-4 uppercase">INFORMACIÓN</h3>
                    <ul className="space-y-2 text-pink-400">
                        <li><a href="#" className="hover:underline">Sobre Nosotros</a></li>
                        <li><a href="#" className="hover:underline">Contáctenos</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="font-bold mb-4 uppercase">EXTRAS</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Lista De Precios</a></li>
                        <li><a href="#" className="hover:underline">Libro De Reclamaciones</a></li>
                    </ul>
                </div>


                <div className="rounded border border-gray-700 overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=..."
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa de la empresa"
                    />
                </div>
            </div>

            {/* Redes sociales y footer bottom */}
            <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>Síguenos en nuestras Redes Sociales</p>
                <div className="flex space-x-4 mt-4 md:mt-0">

                    <a href="#" aria-label="Facebook" className="hover:text-white">📘</a>
                    <a href="#" aria-label="Instagram" className="hover:text-white">📸</a>
                    <a href="#" aria-label="TikTok" className="hover:text-white">🎵</a>
                    <a href="#" aria-label="YouTube" className="hover:text-white">▶️</a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-white">🔗</a>
                </div>
            </div>
        </footer>
    );
}

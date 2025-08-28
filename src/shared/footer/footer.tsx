export default function Footer() {
    return (
        <footer className="bg-orange-600 text-white py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">MUN2-RIDERS</h2>
                    <p className="text-sm">© 2025 Todos los derechos reservados.</p>
                </div>
                <div className="flex space-x-6">
                    <a href="#" className="hover:underline">Inicio</a>
                    <a href="#" className="hover:underline">Productos</a>
                    <a href="#" className="hover:underline">Contacto</a>
                    <a href="#" className="hover:underline">Política de privacidad</a>
                </div>
            </div>
        </footer>
    );
}

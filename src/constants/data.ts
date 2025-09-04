import {NavItem, navItemHome} from "@/ui/types";

export const navItems: NavItem[] = [
  {
    title: "Pagina web",
    href: "/home",
    icon: "monitor",
    label: "page_home",
  },
  {
    title: "Inicio",
    href: "/dashboard",
    icon: "home",
    label: "inicio",
  },
  {
    title: "Productos",
    href: "/dashboard/products",
    icon: "blocks",
    label: "productos",
  },
];

export const navItemsHome: navItemHome[] = [
  {
    title: "Productos",
    href: "/home/products",
    label: "products",
  },
  {
    title: "Servicios",
    href: "/home/services",
    label: "services",
  },
  {
    title: "Contactenos",
    href: "/home/contact",
    label: "contact",
  },
  {
    title: "Administrador",
    href: "/dashboard/",
    label: "admin",
  },
];
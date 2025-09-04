"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/shared/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/ui/types";
import { Dispatch, SetStateAction } from "react";

interface HomeNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isLoggedIn?: boolean;
}

export function HomeNav({items, setOpen, isLoggedIn}: HomeNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  const visibleItems = items.filter((item) => {
    if (item.label === "admin") {
      return isLoggedIn;
    }
    return true;
  });

  return (
    <>
      {visibleItems.map((item, index) => {
        return (
          item.href && (
            <li key={index} className="cursor-pointer">
              <div className="w-28 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition text-black">
                <Link
                  href={item.disabled ? "/" : item.href}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                >
                  <span>{item.title}</span>
                </Link>
              </div>
            </li>
          )
        );
      })}
    </>
  );
}

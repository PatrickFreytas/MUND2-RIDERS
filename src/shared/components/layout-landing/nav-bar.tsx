"use client";

import {HomeNav} from "@/shared/components/layout-landing/home-nav";
import {navItemsHome} from "@/constants/data";
import {isLoggedInUser} from "@/user/actions";
import {useEffect, useState} from "react";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    const fetch = async () => {
      const isLoggedIn = await isLoggedInUser();
      if(!isLoggedIn.success){
        return setIsLoggedIn(false);
      }
      setIsLoggedIn(true)
    }
    fetch()
  }, []);

  return (
    <ul className="flex gap-6 text-base font-medium items-center">
      <li className="cursor-pointer hover:text-orange-600 transition">
        MUNDO <span className="text-red-600 font-bold">RID2</span> TU MEJOR OPCION
      </li>
      <HomeNav items={navItemsHome} isLoggedIn={isLoggedIn}/>
    </ul>
  );
}

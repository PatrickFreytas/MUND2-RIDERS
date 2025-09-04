"use client";

import useSignOut from "@/lib/use-sign-out";
import Link from "next/link";

export default function SignOut() {
  const signOut = useSignOut();
  return <Link href="/login" onClick={() => signOut()}>Cerrar sesión</Link>;
}

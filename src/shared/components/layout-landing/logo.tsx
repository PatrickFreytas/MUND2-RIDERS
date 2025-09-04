import Image from "next/image";
import { getSession } from "@/lib/auth";
import { getCompany } from "@/company/db_repository";
import { notFound } from "next/navigation";
import SignOutRedirection from "@/shared/components/sign-out-redirection";
import {getCompanyWithOutSession} from "@/user/actions";

export async function LogoImage() {
  const companyResponse = await getCompanyWithOutSession();

  if (!companyResponse.success) {
    notFound();
    return;
  }

  const logoUrl = companyResponse.data.logo?.url || "";

  if (!logoUrl) {
    return null;
  }

  return (
    <>
      <Image
        fill
        className="object-center object-contain w-full h-full"
        alt="Image"
        src={logoUrl}
      />
    </>
  );
}

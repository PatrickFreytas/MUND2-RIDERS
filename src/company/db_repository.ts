import prisma from "@/lib/prisma";

import {Company, CompanyWithOutSession, Logo} from "@/company/types";
import { response } from "@/lib/types";

export const updateCompany = async (
  company: Company,
): Promise<response<Company>> => {
  try {
    const updatedCompany = await prisma().company.update({
      where: { id: company.id },
      data: {
        id: company.id,
        name: company.name,
        subName: company.subName,
        phone: company.phone,
        email: company.email,
        subdomain: company.subdomain || "some_subdomain",
      },
    });

    return {
      success: true,
      data: {
        ...company,
        ...updatedCompany,
        name: updatedCompany.name || undefined,
        subName: updatedCompany.subName || undefined,
        phone: updatedCompany.phone || undefined,
        email: updatedCompany.email || undefined,
        subdomain: company.subdomain || "some_subdomain",
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};
export const findCompanyWithOutSession = async (): Promise<response<CompanyWithOutSession>> => {
  try {
    const company = await prisma().company.findFirst({include: { logos: true }});

    if (!company) {
      return { success: false, message: "Company not found" };
    }

    const { logos, id,...companyData } = company;

    return {
      success: true,
      data: {
        id: id,
        logo: logos[0],
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const getCompany = async (id: string): Promise<response<Company>> => {
  try {
    const company = await prisma().company.findUnique({
      where: { id },
      include: { logos: true },
    });

    if (!company) {
      return { success: false, message: "Company not found" };
    }

    const { ...companyData } = company;

    return {
      success: true,
      data: {
        ...companyData,
        logo: company.logos[0],
        name: company.name || undefined,
        subName: company.subName || undefined,
        phone: company.phone || undefined,
        email: company.email || undefined,
        subdomain: company.subdomain || "some_subdomain",
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const getLogo = async (
  compnayId: string,
  logoId: string,
): Promise<response<Logo>> => {
  try {
    const logo = await prisma().logo.findUnique({ where: { id: logoId } });
    if (!logo) return { success: false, message: "Logo not found" };
    return { success: true, data: logo };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const storeLogo = async (
  companyId: string,
  newLogo: Logo,
): Promise<response<Logo>> => {
  try {
    const logo = await prisma().logo.findFirst({
      where: { companyId: companyId },
    });
    if (logo) {
      await prisma().logo.delete({ where: { id: logo.id } });
    }
    const createdLogo = await prisma().logo.create({
      data: {
        id: newLogo.id,
        key: newLogo.key,
        name: newLogo.name,
        url: newLogo.url,
        type: newLogo.type,
        size: newLogo.size,
        companyId: companyId,
      },
    });
    return { success: true, data: createdLogo };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const removeLogo = async (
  companyId: string,
  logoId: string,
): Promise<response<Logo>> => {
  const logoResponse = await getLogo(companyId, logoId);
  if (!logoResponse.success) return logoResponse;

  try {
    await prisma().logo.delete({
      where: { id: logoId, companyId: companyId },
    });
    return { success: true, data: logoResponse.data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const userExists = async (userId: string) => {
  return !!(await prisma().user.findUnique({ where: { id: userId } }));
};
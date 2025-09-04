import prisma from "@/lib/prisma";
import {
  Photo,
  Product,
  ProductSearchParams,
  ProductSortParams,
  SingleProduct,
  SingleProductType,
  TypeSingleProductType,
} from "./types";
import { response } from "@/lib/types";
import {
  Category as PrismaCategory,
  Prisma,
  Product as PrismaProduct,
} from "@prisma/client";

interface searchParams {
  q: string;
  categoryId?: string | null;
}

const singleProductToPrisma = (
  product: SingleProduct,
): Prisma.ProductCreateInput => {
  const { type, id, photos, categories, ...data } = product;

  return {
    ...data,
    sku: product.sku || null,
    price: new Prisma.Decimal(product.price),
    stock: new Prisma.Decimal(product.stock),
  };
};

const createSingleProduct = async (
  product: SingleProduct,
): Promise<response<SingleProduct>> => {
  try {
    const { photos, categories, ...productData } = product;

    const createdResponse = await prisma().product.create({
      data: singleProductToPrisma(product),
    });

    const productCategories = await prisma().category.findMany({
      where: { id: { in: categories.map((c) => c.id!) } },
    });

    const createdProduct: SingleProduct = {
      ...createdResponse,
      companyId: createdResponse.companyId || "some_company_id",
      type: SingleProductType,
      sku: createdResponse.sku || undefined,
      stock: createdResponse.stock!.toNumber(),
      price: createdResponse.price.toNumber(),
      categories: productCategories.map((c) => ({
        ...c,
        companyId: c.companyId || "some_company_id",
      })),
    };

    return { success: true, data: createdProduct };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const create = async (product: Product): Promise<response<Product>> => {
  const response = await createSingleProduct(product);

  if (!response.success) return response;

  await prisma().product.update({
    where: { id: response.data.id },
    data: {
      photos: product.photos
        ? {
          create: product.photos.map((photo) => ({
            ...photo,
          })),
        }
        : undefined,
      categories: product.categories
        ? { connect: product.categories.map((c) => ({ id: c.id })) }
        : undefined,
    },
  });

  return { success: true, data: { ...response.data, ...product } };
};

export const getTotal = async ({
  companyId,
}: {
  companyId: string;
}): Promise<response<number>> => {
  const total = await prisma().product.count({ where: { companyId } });
  return { success: true, data: total };
};

const updateSingleProduct = async (
  product: SingleProduct,
): Promise<response<SingleProduct>> => {
  const { photos, categories, type, ...productData } = product;

  try {
    await prisma().product.update({
      where: { id: product.id },
      data: singleProductToPrisma(product),
    });
    return { success: true, data: { ...product } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const update = async (product: Product): Promise<response<Product>> => {
  return updateSingleProduct(product)
};

const prismaToProduct = async (
  prismaProduct: PrismaProduct & { categories: PrismaCategory[] },
): Promise<Product> => {
    const price = prismaProduct.price.toNumber(); // Prisma (DB) returns decimal and Product model expects number
    return {
      ...prismaProduct,
      companyId: prismaProduct.companyId || "some_company_id",
      type: SingleProductType,
      sku: prismaProduct.sku || undefined,
      stock: prismaProduct.stock!.toNumber(),
      price,
      categories: prismaProduct.categories.map((c) => ({
        ...c,
        companyId: c.companyId || "some_company_id",
      })),
    }
};

export type GetManyParams = {
  companyId: string;
  sortBy?: ProductSortParams;
  categoryId?: searchParams["categoryId"];
  limit?: number;
  pageNumber?: number;
  q?: string | null;
  productType?: TypeSingleProductType;
};

export const getMany = async ({
  companyId,
  sortBy,
  categoryId,
  limit,
  pageNumber,
  q,
}: GetManyParams): Promise<response<Product[]>> => {
  try {
    const query: Prisma.ProductFindManyArgs = {
      where: { companyId },
      orderBy: sortBy ? [{ ...sortBy }, { stock: "desc" }] : { stock: "desc" },
    };

    if (categoryId)
      query.where = {
        ...query.where,
        categories: { some: { id: categoryId } },
      };
    if (limit) query.take = limit;
    if (pageNumber && limit) query.skip = (pageNumber - 1) * limit;
    if (q) {
      const searchValues: string[] = q
        .split(" ")
        .filter((v) => v && v.length > 0);
      query.where = {
        ...query.where,
        name: { search: searchValues.join(" & ") },
      };
    }

    const result = await prisma().product.findMany({
      ...query,
      include: { photos: true, categories: true },
    });
    const products = await Promise.all(result.map(prismaToProduct));

    return { success: true, data: products };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const find = async (
  id: string,
  companyId?: string,
): Promise<response<Product>> => {
  try {
    const product = await prisma().product.findUnique({
      where: { id, companyId },
      include: { photos: true, categories: true },
    });

    if (product) {
      return { success: true, data: await prismaToProduct(product) };
    } else {
      return { success: false, message: "Product not found" };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const findBy = async (
  params: ProductSearchParams,
): Promise<response<Product>> => {
  try {
    const { categories, ...rest } = params;
    const searchParams: any = { ...rest };
    if (categories) {
      searchParams.categories = { categories: { id: categories.id } };
    }

    const product = await prisma().product.findFirst({
      where: { ...searchParams },
      include: { photos: true, categories: true },
    });
    if (!product) return { success: false, message: "Product not found" };

    return {
      success: true,
      data: await prismaToProduct(product),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const deleteProduct = async (
  product: Product,
): Promise<response<Product>> => {
  try {
    const deletedProduct = await prisma().product.delete({
      where: { id: product.id },
    });
    return { success: true, data: product };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const getPhotos = async (
  productId: string,
): Promise<response<Photo[]>> => {
  try {
    const photos = await prisma().photo.findMany({ where: { productId } });
    return { success: true, data: photos };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const getPhoto = async (
  productId: string,
  photoId: string,
): Promise<response<Photo>> => {
  try {
    const photo = await prisma().photo.findUnique({ where: { id: photoId } });
    if (!photo) return { success: false, message: "Photo not found" };
    return { success: true, data: photo };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const storePhotos = async (
  productId: string,
  photos: Photo[],
): Promise<response<Photo[]>> => {
  const productPhotosResponse = await getPhotos(productId);

  if (!productPhotosResponse.success)
    return { success: false, message: productPhotosResponse.message };

  const photosToStore = photos.filter(
    (photo) =>
      !(productPhotosResponse.data || []).find((p) => p.key === photo.key),
  );

  try {
    const createdPhotos = await Promise.all(
      photosToStore.map(({ name, key, url, size, type }) =>
        prisma().photo.create({
          data: {
            name,
            key,
            url,
            size,
            type,
            productId,
          },
        }),
      ),
    );
    return { success: true, data: createdPhotos };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const removePhoto = async (
  productId: string,
  photoId: string,
): Promise<response<Photo>> => {
  const photoResponse = await getPhoto(productId, photoId);
  if (!photoResponse.success) return photoResponse;

  try {
    await prisma().photo.delete({
      where: { id: photoId, productId: productId },
    });
    return { success: true, data: photoResponse.data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};

export const search = async ({
  q,
  categoryId,
}: searchParams): Promise<response<Product[]>> => {
  try {
    const query: Prisma.ProductWhereInput = {
      name: { contains: q, mode: "insensitive" },
    };
    if (categoryId) query.categories = { some: { id: categoryId } };

    const result = await prisma().product.findMany({
      where: query,
      include: { photos: true, categories: true },
    });

    return {
      success: true,
      data: await Promise.all(result.map(prismaToProduct)),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error' };
  }
};


import {
  deleteCategory,
  find as findCategory,
  update as UpdateCategory,
} from "@/category/db_respository";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Category } from "@/category/types";

export async function PUT(
  req: Request,
  context:any,
) {
  const id = context.params.id;
  const categoryData: Category = await req.json();

  const findProductResponse = await findCategory(id);
  if (!findProductResponse.success) {
    return NextResponse.json(
      { success: false, message: "Category not found" },
      { status: 404 },
    );
  }

  const updateResponse = await UpdateCategory(categoryData);
  revalidatePath("/categories/" + id);
  return NextResponse.json(updateResponse, {
    status: updateResponse.success ? 200 : 400,
  });
}

export async function DELETE(
  _req: Request,
  context:any,
) {
  const id = context.params.id;
  const session = await getSession();
  if (!session.user) {
    return NextResponse.json(
      { success: false, message: "Unauthenticated user" },
      { status: 401 },
    );
  }

  const findCategoryResponse = await findCategory(id);
  if (!findCategoryResponse.success) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 },
    );
  }

  revalidatePath("/api/categories");

  const response = await deleteCategory(findCategoryResponse.data);
  return NextResponse.json(response, { status: response.success ? 200 : 400 });
}

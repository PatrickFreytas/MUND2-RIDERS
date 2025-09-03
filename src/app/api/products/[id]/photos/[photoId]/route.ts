import { removePhoto, find as findProduct } from "@/product/db_repository";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: any,
) {
  const { id, photoId } = context.params;
  const findProductResponse = await findProduct(id);
  if (!findProductResponse.success) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 },
    );
  }

  const response = await removePhoto(
    findProductResponse.data.id as string,
    photoId,
  );

  return NextResponse.json(response, { status: response.success ? 200 : 400 });
}

import { Photo } from '@/product/types'
import { find as findProduct, storePhotos } from "@/product/db_repository";
import {NextResponse} from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const incomingPhotos  = await req.json() as Photo[];

  const { success: isProductFound } = await findProduct(resolvedParams.id);
  if (!isProductFound) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }

  const photosData: Photo[] = incomingPhotos.map((p) => ({
    name: p.name,
    key: p.key,
    url: p.url,
    appUrl: `https://utfs.io/a/fyhit13fuf/${p.key}`,
    size: 0,
    type: "image/jpeg",
  }));

  const response = await storePhotos(resolvedParams.id, photosData);

  return NextResponse.json(response, { status: response.success ? 200 : 400 });
}
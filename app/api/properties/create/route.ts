import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Not authenticated!" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const address = formData.get("address") as string;
  const distance = formData.get("distance") as string;
  const price = formData.get("price") as string;
  const dateRange = formData.get("dateRange") as string;
  const rating = parseFloat(formData.get("rating") as string);
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoUrl") as string;

  const images = formData.getAll("images") as File[];

  const uploadedImages = await Promise.all(
    images.map(async (image) => {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64 = buffer.toString("base64");
      const upload = await cloudinary.uploader.upload(`data:${image.type};base64,${base64}`, {
        folder: "properties",
      });
      return upload.secure_url;
    })
  );

  const property = await db.property.create({
    data: {
      title,
      address,
      distance,
      price,
      dateRange,
      rating,
      description,
      videoUrl,
      gallery: uploadedImages,
      authorEmail: session.user.email,
    },
  });

  return NextResponse.json(property);
}

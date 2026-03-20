import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ObjectItemService } from "@/backend/services/objects_service";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await ObjectItemService.list();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { error: "Le titre est requis." },
        { status: 400 },
      );
    }

    if (typeof description !== "string" || !description.trim()) {
      return NextResponse.json(
        { error: "La description est requise." },
        { status: 400 },
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: "Une image est requise." },
        { status: 400 },
      );
    }

    const created = await ObjectItemService.create({
      title: title.trim(),
      description: description.trim(),
      image: image as unknown as File,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      const message = "Erreur lors de la création.";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
}

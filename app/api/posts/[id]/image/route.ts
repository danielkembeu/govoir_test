import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ObjectItemService } from "@/backend/services/objects_service";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const { id } = await params;

    if (!image) {
      return NextResponse.json(
        { error: "Une image est requise." },
        { status: 400 },
      );
    }

    const updated = await ObjectItemService.updateImage(
      id,
      image as unknown as File,
    );

    return NextResponse.json(updated);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la mise à jour.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


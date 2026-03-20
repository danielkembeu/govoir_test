import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ObjectItemService } from "@/backend/services/objects_service";

export const dynamic = "force-dynamic";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await ObjectItemService.getById(id);

  return NextResponse.json(post);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await ObjectItemService.delete(id);
  
  return new NextResponse(null, { status: 204 });
}

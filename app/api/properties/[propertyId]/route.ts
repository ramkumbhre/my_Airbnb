import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  propertyId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = params;

  if (!propertyId) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.listing.deleteMany({
    where: {
      id: propertyId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({ success: true });
}

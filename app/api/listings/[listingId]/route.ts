// import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//       listingId: string;
// }

// export async function DELETE (
//       request: Request,
//       {params}: {params: IParams}
// ) {
//       const currentUser = await getCurrentUser();

//       if(!currentUser) {
//             return NextResponse.error;
//       }

//       const { listingId } = params;

//       if(!listingId || typeof listingId !== "string") {
//             throw new Error("Invalid listing id");
//       }

//       const listing = await prisma.listing.deleteMany({
//             where: {
//                   id: listingId,
//                   userId: currentUser.id,
//             }
//       })

//       return NextResponse.json(listing);
// }



// app/api/listings/[listingId]/route.ts

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
): Promise<Response> {
  const currentUser = await getCurrentUser();

  // ✅ FIX 1: Call the function, don't return it
  if (!currentUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { listingId } = params;

  if (!listingId) {
    return NextResponse.json(
      { error: "Invalid listing id" },
      { status: 400 }
    );
  }

  // ✅ FIX 2: Await delete, DO NOT return BatchPayload
  await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  // ✅ Always return a Response
  return NextResponse.json({ success: true });
}

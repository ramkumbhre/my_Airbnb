// import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//     listingId: string;

// }

// export async function POST(
//     request: Request,
//     {params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = params;
//     if(!listingId || typeof listingId !== "string") {
//         return new Error("Invalid Id");
//     }

//     let favouriteIds = [...(currentUser.favouriteIds || [])];

//     favouriteIds.push(listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favouriteIds
//         }
//     });

//     return NextResponse.json(user);
// }

// export async function DELETE(
//     request: Request,
//     {params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = params;
//     if(!listingId || typeof listingId !== "string") {
//         throw new Error("Invalid Id");
//     }

//     let favouriteIds = [...(currentUser.favouriteIds || [])];

//     favouriteIds  = favouriteIds.filter(id => id !== listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favouriteIds
//         }
//     });

//     return NextResponse.json(user);
// }


import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
): Promise<Response> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const result = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[LISTING_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

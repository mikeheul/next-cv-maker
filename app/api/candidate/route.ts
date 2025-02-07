import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    try {
        const candidates = await db.candidate.findMany({
            include: {
                experiences: true,
            },
            where: {
                lastName: {
                    contains: search, // Filtre insensible à la casse
                    mode: "insensitive",
                },
            },
            orderBy: {
                lastName: 'asc'
            }
        });

        return NextResponse.json(candidates);

    } catch (error) {
        console.log("[CANDIDATES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
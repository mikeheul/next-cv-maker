import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {

    try {
        const candidates = await db.candidate.findMany({
            include: {
                experiences: true,
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
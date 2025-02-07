import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { candidateSchema } from '@/lib/validation';

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

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, address, phone } = await req.json();

        if (!firstName || !lastName || !email || !address || !phone) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const parsedData = candidateSchema.safeParse({
            firstName, 
            lastName, 
            email, 
            address, 
            phone
        });

        if (!parsedData.success) {
            return NextResponse.json(
                { message: 'Invalid data', errors: parsedData.error.errors },
                { status: 400 }
            );
        }

        const candidate = await db.candidate.create({
            data: {
                firstName, 
                lastName, 
                email, 
                address, 
                phone
            },
        });

        return NextResponse.json(candidate, { status: 201 });

    } catch (error) {
        console.error('Error adding candidate:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
import { db } from '@/lib/db';
import { experienceSchema } from '@/lib/validation';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, company, startDate, endDate, contractType, description, candidate } = await req.json();

        if (!title || !company || !startDate || !contractType || !candidate) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const parsedData = experienceSchema.safeParse({
            title,
            company,
            startDate,
            endDate,
            contractType,
            description,
            candidate,
        });

        if (!parsedData.success) {
            return NextResponse.json(
                { message: 'Invalid data', errors: parsedData.error.errors },
                { status: 400 }
            );
        }

        const experience = await db.experience.create({
            data: {
                title, 
                company, 
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                contractType,
                description,
                candidate: { connect: { id: candidate } },
            },
        });

        return NextResponse.json(experience, { status: 201 });

    } catch (error) {
        console.error('[ADD_EXPERIENCE]', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
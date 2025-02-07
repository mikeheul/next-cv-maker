import { db } from '@/lib/db';
import { experienceSchema } from '@/lib/validation';
import { NextResponse } from "next/server";

// POST request handler to add a new experience for a candidate
export async function POST(req: Request) {
    try {
        // Extract the experience data from the request body
        const { title, company, startDate, endDate, contractType, description, candidate } = await req.json();

        // Check if any required fields are missing
        if (!title || !company || !startDate || !contractType || !candidate) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Validate the incoming data using the experience schema
        const parsedData = experienceSchema.safeParse({
            title,
            company,
            startDate,
            endDate,
            contractType,
            description,
            candidate,
        });

        // If validation fails, return a 400 response with error details
        if (!parsedData.success) {
            return NextResponse.json(
                { message: 'Invalid data', errors: parsedData.error.errors },
                { status: 400 }
            );
        }

        // Create a new experience in the database, associating it with the given candidate
        const experience = await db.experience.create({
            data: {
                title, 
                company, 
                startDate: new Date(startDate), // Convert startDate to a Date object
                endDate: endDate ? new Date(endDate) : null, // Convert endDate if provided
                contractType,
                description,
                candidate: { connect: { id: candidate } }, // Link the experience to the candidate
            },
        });

        // Return the newly created experience with a 201 status (created)
        return NextResponse.json(experience, { status: 201 });

    } catch (error) {
        // Log any errors that occur during the POST request
        console.error('[ADD_EXPERIENCE]', error);

        // Return a 500 response with an internal error message
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

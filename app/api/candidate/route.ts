import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { candidateSchema } from '@/lib/validation';

// GET request handler to fetch all candidates
export async function GET() {
    try {
        // Query the database to get all candidates, including their experiences
        const candidates = await db.candidate.findMany({
            include: {
                experiences: true, // Include the candidate's experiences
            },
            orderBy: {
                lastName: 'asc' // Order candidates by last name in ascending order
            }
        });

        // Return the candidates as a JSON response
        return NextResponse.json(candidates);

    } catch (error) {
        // Log any errors that occur during the GET request
        console.error("[CANDIDATES]", error);

        // Return a 500 response with an internal error message
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// POST request handler to add a new candidate
export async function POST(req: Request) {
    try {
        // Extract the candidate data from the request body
        const { firstName, lastName, email, address, phone } = await req.json();

        // Check if any required fields are missing
        if (!firstName || !lastName || !email || !address || !phone) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Validate the incoming data using the candidate schema
        const parsedData = candidateSchema.safeParse({
            firstName, 
            lastName, 
            email, 
            address, 
            phone
        });

        // If validation fails, return a 400 response with error details
        if (!parsedData.success) {
            return NextResponse.json(
                { message: 'Invalid data', errors: parsedData.error.errors },
                { status: 400 }
            );
        }

        // Create a new candidate in the database with the provided data
        const candidate = await db.candidate.create({
            data: {
                firstName, 
                lastName, 
                email, 
                address, 
                phone
            },
        });

        // Return the newly created candidate data with a 201 status (created)
        return NextResponse.json(candidate, { status: 201 });

    } catch (error) {
        // Log any errors that occur during the POST request
        console.error('[ADD_CANDIDATE]', error);

        // Return a 500 response with an internal error message
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

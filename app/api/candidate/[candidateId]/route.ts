import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// Type definition for the route parameters, expecting a 'candidateId'
type Props = {
    params: Promise<{ candidateId: string }>
}

// GET request handler function to fetch a candidate by ID
export async function GET(req: Request, { params }: Props) {
    // Await the 'candidateId' from the route parameters
    const { candidateId } = await params;

    try {
        // Query the database to find the candidate by the given ID
        const candidate = await db.candidate.findUnique({
            where: {
                id: candidateId, // Search for the candidate with this ID
            },
            include: {
                experiences: { // Include the candidate's experiences, ordered by start date (descending)
                    orderBy: { startDate: 'desc' },
                }
            }
        });

        // If no candidate is found, return a 404 response with an error message
        if (!candidate) {
            return NextResponse.json({ message: 'Candidate not found' }, { status: 404 });
        }

        // Return the candidate's data as a JSON response
        return NextResponse.json(candidate);
    } catch (error) {
        // Log any error that occurs during the request
        console.error('[GET_CANDIDATE]', error);

        // Return a 500 response with an internal error message
        return NextResponse.json({ message: 'Internal error' }, { status: 500 });
    }
}

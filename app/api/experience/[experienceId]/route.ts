import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Type definition for route parameters, expecting an 'experienceId'
type Props = {
    params: Promise<{ experienceId: string }>
}

// DELETE request handler to remove a specific experience
export async function DELETE(req: Request, { params }: Props) {
    try {
        // Await the 'experienceId' from the route parameters
        const { experienceId } = await params;

        // Check if the experience exists in the database
        const experience = await db.experience.findUnique({ where: { id: experienceId } });

        // If no experience is found, return a 404 response with an error message
        if (!experience) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        }

        // Delete the experience from the database
        await db.experience.delete({ where: { id: experienceId } });

        // Revalidate the candidate's page to reflect the removal of the experience
        revalidatePath(`/candidate/${experience.candidateId}`);

        // Return a 200 response confirming the experience has been deleted
        return NextResponse.json({ message: "Experience deleted" }, { status: 200 });

    } catch (error) {
        // Log any errors that occur during the DELETE request
        console.error('[DELETE_EXPERIENCE]', error);

        // Return a 500 response with an internal server error message
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

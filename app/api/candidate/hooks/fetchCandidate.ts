import { Candidate } from "@/types/types";
import { redirect } from "next/navigation";

// Asynchronous function to fetch a candidate's data from the API
export const fetchCandidate = async (candidateId: string): Promise<Candidate> => {
    // Determine the base URL depending on the environment (production or development)
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://next-cv-maker.vercel.app' // Production URL
        : 'http://localhost:3000'; // Development URL

    // Fetch candidate data from the API
    const res = await fetch(`${baseUrl}/api/candidate/${candidateId}`, {
        cache: "no-store", // Ensures fresh data is fetched each time
    });

    // If the request fails, redirect to the candidate page
    if (!res.ok) {
        redirect("/candidate"); 
    }

    // Return the fetched candidate data as JSON
    return res.json();
};
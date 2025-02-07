import { Candidate } from "@/types/types";

export const fetchCandidate = async (candidateId: string): Promise<Candidate> => {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://next-cv-maker.vercel.app' 
        : 'http://localhost:3000'; 

    const res = await fetch(`${baseUrl}/api/candidate/${candidateId}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch candidate");
    return res.json();
};




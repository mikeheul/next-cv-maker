import { Candidate } from "@/types/types";

// one candidate
export const fetchCandidate = async (candidateId: string): Promise<Candidate> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidate/${candidateId}`, {
        next: { revalidate: 60 }, 
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch candidate");
    return res.json();
};
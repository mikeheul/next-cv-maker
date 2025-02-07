import { Candidate } from "@/types/types";
import { redirect } from "next/navigation";

export const fetchCandidate = async (candidateId: string): Promise<Candidate> => {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://next-cv-maker.vercel.app' 
        : 'http://localhost:3000'; 

    const res = await fetch(`${baseUrl}/api/candidate/${candidateId}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        redirect("/candidate"); 
    }

    return res.json();
};




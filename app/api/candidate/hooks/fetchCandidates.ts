// all candidates 
export const fetchCandidates = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidate`, {
        next: { revalidate: 60 }, 
    });
    if (!res.ok) throw new Error("Failed to fetch candidates");
    return res.json();
};
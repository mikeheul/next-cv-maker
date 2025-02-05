// all candidates 
export const fetchCandidates = async () => {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidate`, {
        const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://next-cv-maker.vercel.app' 
        : 'http://localhost:3000'; 

    const res = await fetch(`${baseUrl}/api/candidate/`, {
        next: { revalidate: 60 },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch candidates");
    return res.json();
};
export const fetchCandidates = async (search = "") => {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://next-cv-maker.vercel.app' 
        : 'http://localhost:3000'; 

    const params = new URLSearchParams();
    if (search) params.append("search", search);

    const res = await fetch(`${baseUrl}/api/candidate/?${params.toString()}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch candidates");
    return res.json();
};
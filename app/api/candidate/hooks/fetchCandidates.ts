export const fetchCandidates = async (search = "") => {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://next-cv-maker.vercel.app' 
        : 'http://localhost:3000'; 

    const url = `${baseUrl}/api/candidate?search=${search}`; // Ajoutez le paramètre de recherche à l'URL
    const res = await fetch(url, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch candidates");
    return res.json();
};
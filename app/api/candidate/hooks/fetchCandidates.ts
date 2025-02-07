// Asynchronous function to fetch a list of candidates from the API
export const fetchCandidates = async () => {
    // Determine the base URL depending on the environment (production or development)
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://next-cv-maker.vercel.app' // Production URL
        : 'http://localhost:3000'; // Development URL

    // Construct the full URL to the candidates API endpoint
    const url = `${baseUrl}/api/candidate`;

    // Fetch the candidates' data from the API
    const res = await fetch(url, {
        cache: "no-store", // Ensures fresh data is fetched each time
    });

    // If the request fails, throw an error with a message
    if (!res.ok) throw new Error("Failed to fetch candidates");

    // Return the fetched candidates' data as JSON
    return res.json();
};

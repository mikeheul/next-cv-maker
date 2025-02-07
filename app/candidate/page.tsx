import CandidateList from "@/components/CandidateList";
import { fetchCandidates } from "../api/candidate/hooks/fetchCandidates";
import CandidateForm from "@/components/CandidateForm";

// CandidatesPage component that fetches and displays the list of candidates
const CandidatesPage = async () => {

    // Fetch the list of candidates using the fetchCandidates function
    const candidates = await fetchCandidates();

    return (
        <>
            {/* Page title displaying the number of candidates */}
            <h1 className="flex items-center py-4 text-4xl text-white font-bold">
                <span>Candidats</span> 
                {/* Display the number of candidates in a rounded badge */}
                <span className="ml-2 inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white">
                    {candidates.length}
                </span>
            </h1>

            {/* Pass the fetched candidates to the CandidateList component for display */}
            <CandidateList
                candidates={candidates}
            />

            {/* Include the CandidateForm component for adding a new candidate */}
            <CandidateForm />
        </>
    );
};

export default CandidatesPage;
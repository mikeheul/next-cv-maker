import CandidateList from "@/components/CandidateList";
import { fetchCandidates } from "../api/candidate/hooks/fetchCandidates";
import CandidateForm from "@/components/CandidateForm";

const CandidatesPage = async () => {

    const candidates = await fetchCandidates();

    return (
        <>
            <h1 className="flex items-center py-4 text-4xl text-white font-bold">
                <span>Candidats</span> 
                <span className="ml-2 inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white">
                    {candidates.length}
                </span>
            </h1>

            <CandidateList
                candidates={candidates}
            />

            <CandidateForm />
        </>
    );
};

export default CandidatesPage;
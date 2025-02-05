import CandidateList from "@/components/CandidateList";
import { fetchCandidates } from "../api/candidate/hooks/fetchCandidates";

const CandidatesPage = async () => {
    const candidates = await fetchCandidates();

    return (
        <>
            <h1 className="py-4 text-4xl text-white font-bold">Candidats</h1>
            <CandidateList
                candidates={candidates}
            />
        </>
    );
};

export default CandidatesPage;
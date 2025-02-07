import CandidateList from "@/components/CandidateList";
import { fetchCandidates } from "../api/candidate/hooks/fetchCandidates";

interface CandidatesPageProps {
    searchParams?: { search?: string };
}

const CandidatesPage = async ({ searchParams }: CandidatesPageProps) => {

    const search = searchParams?.search || "";
    const candidates = await fetchCandidates(search);
    // const candidates = await fetchCandidates();

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
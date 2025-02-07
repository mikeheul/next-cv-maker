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

            {/* Ajout du champ de recherche */}
            <form action="/candidate" method="GET" className="mb-4">
                <input
                    type="text"
                    name="search"
                    placeholder="Rechercher par nom..."
                    defaultValue={search}
                    className="p-2 border rounded-md w-full bg-gray-800 text-white"
                />
                <button type="submit" className="mt-2 p-2 bg-blue-600 text-white rounded-md">
                    Filtrer
                </button>
            </form>

            <CandidateList
                candidates={candidates}
            />
        </>
    );
};

export default CandidatesPage;
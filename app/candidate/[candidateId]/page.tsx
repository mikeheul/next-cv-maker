import { fetchCandidate } from "@/app/api/candidate/hooks/fetchCandidate";
import ExperienceForm from "@/components/ExperienceForm";
import ExperienceList from "@/components/ExperienceList";
import { Candidate } from "@/types/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type PageProps = {
    params: Promise<{ candidateId: string }>
}

const CandidatePage = async ({ params }: PageProps) => {

    const { candidateId } = await params;
    const candidate: Candidate = await fetchCandidate(candidateId);

    return (
        <>
            <h1 className="py-4 text-4xl text-white font-bold">Candidat</h1>

            <div className="flex flex-col py-6">
                <Link 
                    href="/candidate"
                    className="inline-flex items-center text-sm text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md mb-6 transition-colors duration-300 m-auto ml-0"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" /> Retour à la liste des candidats
                </Link>

            </div>

            <div className="border-l pl-4">
                <h2 className="text-2xl text-white ">{ candidate.firstName } { candidate.lastName }</h2>
                <p className="text-gray-300">Email : { candidate.email }</p>
                { candidate.phone && <p className="text-gray-300">Téléphone : { candidate.phone }</p>}
                { candidate.address && <p className="text-gray-300">Adresse : { candidate.address }</p>}
            </div>
            
            <Link 
                href={`/api/candidate/${candidateId}/cv`} 
                className="mt-6 inline-flex bg-blue-600 text-white px-4 py-2 rounded-md m-auto ml-0"
                target="_blank"
            >
                <DocumentIcon className="w-5 h-5 mr-2" /> Télécharger le CV en PDF
            </Link>

            {candidate.experiences && candidate.experiences.length > 0 ? (
                <ExperienceList experiences={candidate.experiences} />
            ) : (
                <p className="text-gray-500 mt-4">Aucune expérience disponible pour ce candidat.</p>
            )}
            
            <ExperienceForm candidateId={candidateId} />
        </>
    );
    
};

export default CandidatePage;
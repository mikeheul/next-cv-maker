import { fetchCandidate } from "@/app/api/candidate/hooks/fetchCandidate";
import ExperienceForm from "@/components/ExperienceForm";
import ExperienceList from "@/components/ExperienceList";
import { Candidate } from "@/types/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Type definition for the route parameters, expecting a 'candidateId'
type PageProps = {
    params: Promise<{ candidateId: string }>
}

// Candidate page component that fetches and displays candidate details and experiences
const CandidatePage = async ({ params }: PageProps) => {

    // Await the 'candidateId' from the route parameters
    const { candidateId } = await params;

    // Fetch the candidate's data using the candidateId
    const candidate: Candidate = await fetchCandidate(candidateId);

    return (
        <>
            {/* Header section with the title of the page */}
            <h1 className="py-4 text-4xl text-white font-bold">Candidat</h1>

            {/* Back to the candidate list button */}
            <div className="flex flex-col py-6">
                <Link 
                    href="/candidate"
                    className="inline-flex items-center text-sm text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md mb-6 transition-colors duration-300 m-auto ml-0"
                >
                    {/* Left arrow icon */}
                    <ArrowLeftIcon className="w-5 h-5 mr-2" /> Retour candidats
                </Link>
            </div>

            {/* Candidate details section */}
            <div className="border-l pl-4">
                <h2 className="text-4xl font-semibold text-white ">{ candidate.firstName } { candidate.lastName }</h2>
                <p className="text-gray-300">Email : { candidate.email }</p>
                {/* Show phone number if available */}
                { candidate.phone && <p className="text-gray-300">Téléphone : { candidate.phone }</p>}
                {/* Show address if available */}
                { candidate.address && <p className="text-gray-300">Adresse : { candidate.address }</p>}
            </div>

            {/* Link to download the candidate's CV in PDF format */}
            <Link 
                href={`/api/candidate/${candidateId}/cv`} 
                className="mt-6 inline-flex bg-blue-600 text-white px-4 py-2 rounded-md m-auto ml-0"
                target="_blank"
            >
                {/* Document icon */}
                <DocumentIcon className="w-5 h-5 mr-2" /> Télécharger CV
            </Link>

            {/* Display a list of the candidate's experiences if available */}
            {candidate.experiences && candidate.experiences.length > 0 ? (
                <ExperienceList experiences={candidate.experiences} />
            ) : (
                // Show message if no experiences are available
                <p className="text-gray-500 mt-4">Aucune expérience disponible pour ce candidat</p>
            )}

            {/* Experience form to add a new experience for the candidate */}
            <ExperienceForm candidateId={candidateId} />
        </>
    );
};

export default CandidatePage;
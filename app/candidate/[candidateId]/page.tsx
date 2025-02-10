"use client"; 
import { use, useEffect, useState } from "react";
import { fetchCandidate } from "@/app/api/candidate/hooks/fetchCandidate";
import ExperienceList from "@/components/ExperienceList";
import ExperienceForm from "@/components/ExperienceForm";
import SkillBadge from "@/components/SkillBadge";
import Modal from "@/components/Modal";
import { Candidate } from "@/types/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type PageProps = {
    params: Promise<{ candidateId: string }>;
};

const CandidatePage = ({ params }: PageProps) => {
    const { candidateId } = use(params);

    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadCandidate = async () => {
            try {
                const data = await fetchCandidate(candidateId);
                setCandidate(data);
            } catch (err) {
                console.log(err)
                setError("Erreur lors du chargement du candidat.");
            } finally {
                setIsLoading(false);
            }
        };

        loadCandidate();
    }, [candidateId]);

    if (isLoading) return <p className="text-gray-300">Chargement...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!candidate) return <p className="text-gray-500">Candidat introuvable.</p>;

    return (
        <>
            <h1 className="py-4 text-4xl text-white font-bold">Candidat</h1>

            <div className="flex flex-col py-6">
                <Link 
                    href="/candidate"
                    className="inline-flex items-center text-sm text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md mb-6 transition-colors duration-300 m-auto ml-0"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" /> Retour candidats
                </Link>
            </div>

            <div className="border-l pl-4">
                <h2 className="text-4xl font-semibold text-white">
                    {candidate.firstName} {candidate.lastName}
                </h2>
                <p className="text-gray-300">Email : {candidate.email}</p>
                {candidate.phone && <p className="text-gray-300">Téléphone : {candidate.phone}</p>}
                {candidate.address && <p className="text-gray-300">Adresse : {candidate.address}</p>}
            </div>

            {/* Affichage des skills */}
            {candidate.skills && candidate.skills.length > 0 ? (
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">Compétences</h3>
                    <ul className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                            <li key={index}>
                                <SkillBadge skill={skill} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">Aucune compétence renseignée</p>
            )}

            {/* Télécharger le CV */}
            <Link 
                href={`/api/candidate/${candidateId}/cv`} 
                className="mt-6 inline-flex bg-blue-600 text-white px-4 py-2 rounded-md m-auto ml-0"
                target="_blank"
            >
                <DocumentIcon className="w-5 h-5 mr-2" /> Télécharger CV
            </Link>

            {/* Affichage des expériences */}
            {candidate.experiences && candidate.experiences.length > 0 ? (
                <ExperienceList experiences={candidate.experiences} />
            ) : (
                <p className="text-gray-500 mt-4">Aucune expérience disponible pour ce candidat</p>
            )}

            {/* Bouton pour ouvrir la modale */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-green-800 text-white px-4 py-2 rounded-md"
            >
                Ajouter une expérience
            </button>

            {/* Modale contenant le formulaire */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold text-white mb-4">Ajouter une expérience</h2>
                <ExperienceForm candidateId={candidateId} />
            </Modal>
        </>
    );
};

export default CandidatePage;

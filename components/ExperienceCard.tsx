"use client";

import React from 'react';
import { ExperienceCardProps } from '@/types/types';
import { TrashIcon } from '@heroicons/react/16/solid';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const ExperienceCard = ({ experience }: ExperienceCardProps) => {

    const startDateFormatted = new Date(experience.startDate).toLocaleDateString('fr-FR');
    const endDateFormatted = experience.endDate
        ? new Date(experience.endDate).toLocaleDateString('fr-FR')
        : 'Présent';


    const handleDelete = async (id: string) => {
        if (confirm("Voulez-vous vraiment supprimer cette expérience ?")) {
            const res = await fetch(`/api/experience/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                window.location.reload();
            } else {
                alert("Erreur lors de la suppression de l'expérience.");
            }
        }
    };

    return (
        <div className="bg-slate-700 rounded-xl p-6 shadow-2xl transition-shadow duration-300 relative">
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex flex-col items-start">
                    <h4 className="text-lg font-semibold text-white mb-2">{experience.title}</h4>

                    <h5 className="bg-slate-600 text-slate-200 rounded-md px-3 py-1 text-sm mb-2">{experience.company}</h5>
                    
                    
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-white">Description du poste</AccordionTrigger>
                            <AccordionContent className="text-white/80 font-thin">
                                {experience.description}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* <p className="font-thin text-white/80">{experience.description}</p> */}
                </div>

                <div className="flex mt-5 md:mt-0 flex-col">
                    <p className="text-gray-300 text-sm">{startDateFormatted}</p>
                    <p className="text-gray-300 text-sm">{endDateFormatted}</p>
                </div>
            </div>

            {/* Type de contrat en bas à droite */}
            <div className="absolute bottom-6 right-6 bg-slate-600 text-slate-200 px-4 py-2 rounded-full text-sm">
                {experience.contractType}
            </div>

            <button
                onClick={() => handleDelete(experience.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white w-10 h-10 rounded-md flex justify-center items-center"
            >
                <TrashIcon className="h-5 w-5" />
                <span className="sr-only">Supprimer</span>
            </button>
        </div>
    );
};

export default ExperienceCard;

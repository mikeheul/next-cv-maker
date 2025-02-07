import React from 'react';
import { ExperienceListProps } from '@/types/types';
import ExperienceCard from './ExperienceCard';

const ExperienceList = ({ experiences }: ExperienceListProps) => {
    return (
        <div className='py-6'>
            <h3 className="flex items-center text-xl text-white font-bold mb-2">
                <span>Expériences</span>
                <span className="ml-2 inline-flex items-center rounded-full bg-slate-500 px-3 py-1 text-sm font-medium text-white">
                    {experiences.length}
                </span>    
            </h3>
            <div className="flex flex-col gap-3">
                {experiences.map((exp, index) => (
                    <ExperienceCard experience={ exp } key={ index } />
                ))}
            </div>    
        </div>
    );
};

export default ExperienceList;
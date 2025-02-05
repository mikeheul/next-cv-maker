import React from 'react';
import { ExperienceListProps } from '@/types/types';
import ExperienceCard from './ExperienceCard';

const ExperienceList = ({ experiences }: ExperienceListProps) => {
    return (
        <div className='py-6'>
            <h3 className="text-xl font-bold mb-2">Expériences</h3>
            <div className="flex flex-col gap-3">
                {experiences.map((exp, index) => (
                    <ExperienceCard experience={ exp } key={ index } />
                ))}
            </div>    
        </div>
    );
};

export default ExperienceList;
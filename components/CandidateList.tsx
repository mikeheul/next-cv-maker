import React from 'react'
import CandidateCard from './CandidateCard';
import { CandidateListProps } from '@/types/types';

function CandidateList({ candidates }: CandidateListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((candidate, index) => (
                <CandidateCard key={index} candidate={candidate} />
            ))}
        </div>
    )
}

export default CandidateList
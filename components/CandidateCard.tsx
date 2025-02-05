import { CandidateCardProps } from '@/types/types';
import Link from 'next/link';
import React from 'react'

function CandidateCard({ candidate }: CandidateCardProps) {

    return (
        <Link href={`/candidate/${candidate.id}`} passHref>
            <div className="p-6 rounded-lg shadow-2xl bg-gray-700 text-white cursor-pointer">
                <h2 className="text-xl font-bold">{ candidate.firstName } { candidate.lastName }</h2>
                <p className="text-gray-300">Email : { candidate.email }</p>
                { candidate.phone && <p className="text-gray-300">Téléphone : { candidate.phone }</p>}
                { candidate.address && <p className="text-gray-300">Adresse : { candidate.address }</p>}
            </div>
        </Link>
    );
}

export default CandidateCard
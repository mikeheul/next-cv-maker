import { CandidateCardProps } from '@/types/types';
import Link from 'next/link';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

function CandidateCard({ candidate }: CandidateCardProps) {

    return (
        <Link href={`/candidate/${candidate.id}`} passHref>
            <Card className="cursor-pointer bg-gray-700 text-white hover:shadow-lg transition-all">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">{candidate.firstName} {candidate.lastName}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                    <p>Email : {candidate.email}</p>
                    {candidate.phone && <p>Téléphone : {candidate.phone}</p>}
                    {candidate.address && <p>Adresse : {candidate.address}</p>}
                </CardContent>
            </Card>
        </Link>
    );
}

export default CandidateCard
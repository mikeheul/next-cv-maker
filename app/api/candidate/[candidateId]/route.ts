import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { candidateId: string } }) {
    
    const { candidateId } = params;

    try {
        const candidate = await db.candidate.findUnique({
            where: {
                id: candidateId,
            },
            include: {
                experiences: {
                    orderBy: { startDate: 'desc' },
                }
            }
        });

        if (!candidate) {
            return NextResponse.json({ message: 'Candidat non trouvé' }, { status: 404 });
        }

        return NextResponse.json(candidate);
    } catch (error) {
        console.error('Erreur lors de la récupération du candidat :', error);
        return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
    }
}
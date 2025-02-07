import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

type Props = {
    params: Promise<{ candidateId: string }>
}

export async function GET(req: Request, { params }: Props) {
    
    const { candidateId } = await params;

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
        console.error('[GET_CANDIDATE]', error);
        return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
    }
}
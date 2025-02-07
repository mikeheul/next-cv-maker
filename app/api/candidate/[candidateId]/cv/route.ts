import { db } from '@/lib/db';
import { CandidateWithExperiences } from '@/types/types';
import jsPDF from 'jspdf';
import { NextResponse } from 'next/server';

const generateCvPdf = (candidate: CandidateWithExperiences) => {
    const doc = new jsPDF();

    // Fonction pour formater les dates en français
    const formatDate = (date: Date | null) => {
        if (!date) return "Non renseignée";
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(new Date(date));
    };

    // Fonction pour formater la durée de l'expérience
    const formatExperienceDateRange = (startDate: Date, endDate: Date | null) => {
        const start = formatDate(startDate);
        const end = endDate ? formatDate(endDate) : "Présent";
        return `${start} - ${end}`;
    };

    // Ajout des informations du candidat
    doc.setFontSize(18);
    doc.text(`Curriculum Vitae`, 20, 20);
    doc.setFontSize(14);
    doc.text(`${candidate.firstName} ${candidate.lastName}`, 20, 30);
    doc.text(`Email: ${candidate.email}`, 20, 40);
    doc.text(`Téléphone: ${candidate.phone || "Non disponible"}`, 20, 50);
    doc.text(`Adresse: ${candidate.address || "Non disponible"}`, 20, 60);

    // Ajout des expériences professionnelles
    doc.setFontSize(16);
    doc.text("Expériences Professionnelles", 20, 80);
    
    let yOffset = 90; // Définir un décalage pour le positionnement des expériences
    candidate.experiences.forEach(exp => {
        doc.setFontSize(12);
        doc.text(`${exp.title} - ${exp.company}`, 20, yOffset);
        yOffset += 10;
        doc.setFontSize(10);
        doc.text(`${formatExperienceDateRange(exp.startDate, exp.endDate)}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Type de contrat : ${exp.contractType}`, 20, yOffset);
        yOffset += 20; // Ajouter un espace avant la prochaine expérience
    });

    // Générer le PDF et le retourner en tant que buffer
    return doc.output('arraybuffer');
};

type Props = {
    params: Promise<{ candidateId: string }>
}

export async function GET(req: Request, { params }: Props) {
    const { candidateId } = await params;

    try {
        // Récupérer les données du candidat depuis la base
        const candidate = await db.candidate.findUnique({
            where: { id: candidateId },
            include: {
                experiences: { orderBy: { startDate: 'desc' } }
            }
        });

        if (!candidate) {
            return NextResponse.json({ message: 'Candidat non trouvé' }, { status: 404 });
        }

        const pdfBuffer = await generateCvPdf(candidate);

        // Retourner le PDF en réponse
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="CV_${candidate.firstName}_${candidate.lastName}.pdf"`,
            },
        });

    } catch (error) {
        console.error('[GENERATE_CV]', error);
        return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
    }
}

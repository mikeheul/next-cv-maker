import { db } from '@/lib/db';
import { CandidateWithExperiences } from '@/types/types';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

const generateCvHtml = (candidate: CandidateWithExperiences) => {
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

    const experiencesHtml = candidate.experiences.map(exp => ` 
        <div class="mb-6 p-4 border-l-4 border-teal-600 bg-teal-50 shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${exp.title} - ${exp.company}</h3>
            <p class="mt-2 text-gray-600 italic">${formatExperienceDateRange(exp.startDate, exp.endDate)}</p>
            <p class="mt-2 text-gray-700">Type de contrat : <strong>${exp.contractType}</strong></p>
        </div>
    `).join("");

    return `
        <html>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
                    body {
                        font-family: 'Nunito Sans', sans-serif;
                    }
                </style>
            </head>
            <body class="bg-gray-100">
                <div class="max-w-4xl mx-auto bg-white p-6 mt-10">
                    <h1 class="text-3xl font-semibold text-teal-600 text-center">Curriculum Vitae</h1>
                    <h2 class="text-2xl mt-4 text-gray-800 text-center">${candidate.firstName} ${candidate.lastName}</h2>
                    
                    <div class="mt-6 space-y-2">
                        <p class="text-lg font-medium text-gray-700"><strong>Email:</strong> ${candidate.email}</p>
                        <p class="text-lg font-medium text-gray-700"><strong>Téléphone:</strong> ${candidate.phone || "Non disponible"}</p>
                        <p class="text-lg font-medium text-gray-700"><strong>Adresse:</strong> ${candidate.address || "Non disponible"}</p>
                    </div>

                    <div class="mt-8 text-lg font-semibold text-gray-800">Expériences Professionnelles</div>
                    ${experiencesHtml}
                </div>
            </body>
        </html>
    `;
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

        const htmlContent = generateCvHtml(candidate);

        // Lancer Puppeteer pour générer le PDF
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        // Retourner le PDF en réponse
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="CV_${candidate.firstName}_${candidate.lastName}.pdf"`,
            },
        });

    } catch (error) {
        console.error('Erreur lors de la génération du CV :', error);
        return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
    }
}

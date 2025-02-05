import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type Props = {
    params: Promise<{ experienceId: string }>
}

export async function DELETE(req: Request, { params }: Props) {
    try {
        const { experienceId } = await params;

        // Vérifier si l'expérience existe
        const experience = await db.experience.findUnique({ where: { id: experienceId } });
        if (!experience) {
            return NextResponse.json({ message: "Expérience non trouvée" }, { status: 404 });
        }

        // Supprimer l'expérience
        await db.experience.delete({ where: { id: experienceId } });

        // ⚡ Revalider la page du candidat
        revalidatePath(`/candidate/${experience.candidateId}`);

        return NextResponse.json({ message: "Expérience supprimée" }, { status: 200 });

    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
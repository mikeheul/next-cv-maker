"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteExperience(experienceId: string) {
    try {
        await db.experience.delete({ where: { id: experienceId } });

        // Revalidation pour mettre à jour la liste après suppression
        revalidatePath("/candidate");

        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        return { success: false, message: "Erreur lors de la suppression" };
    }
}

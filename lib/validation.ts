import { z } from "zod";

export const experienceSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    company: z.string().min(1, "Le nom de l'entreprise est requis"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La date de début doit être au format YYYY-MM-DD"),
    endDate: z.preprocess((value) => {
        if (value === "" || value === undefined) return undefined; // Permettre l'absence de valeur
        if (value === null) return null; // Permettre explicitement null
        return value; // Sinon, garder la valeur telle quelle
    }, 
    z.union([
        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La date de fin doit être au format YYYY-MM-DD"),
        z.null(),
        z.undefined(),
    ])), 
    contractType: z.string().min(1, "Le type de contrat est requis"),
    candidate: z.string().min(1, "Le candidat est requis"),
});

export const candidateSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom  est requis"),
    email: z.string().min(1, "Le courriel est requis").email("Le courriel doit être valide"),
    address: z.string().min(1, "L'adresse est requise"),
    phone: z.string().min(1, "Le numéro de téléphone est requis"),
});

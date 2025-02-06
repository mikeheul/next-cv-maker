export interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    experiences: Experience[];
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    contractType: string;
    description: string;
}

export interface CandidateWithExperiences {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    address: string | null;
    id: string;
    experiences: {
        company: string;
        startDate: Date;
        endDate: Date | null;
        candidateId: string;
        id: string;
        title: string;
        contractType: string;
    }[];
};

export interface CandidateListProps {
    candidates: Candidate[];
}

export interface CandidateCardProps {
    candidate: Candidate;
}

export interface ExperienceCardProps {
    experience: Experience;
}

export interface ExperienceListProps {
    experiences: Experience[];
}

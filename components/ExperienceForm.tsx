'use client';

import { useState } from 'react';

const ExperienceForm = ({ candidateId }: { candidateId: string }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [contractType, setContractType] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (endDate && new Date(endDate) < new Date(startDate)) {
            setError('La date de fin ne peut pas être antérieure à la date de début.');
            return;
        }

        const data = {
            title,
            company,
            startDate,
            endDate,
            contractType,
            description,
            candidate: candidateId,
        };

        const response = await fetch('/api/experience', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setTitle('');
            setCompany('');
            setStartDate('');
            setEndDate('');
            setContractType('');
            setDescription('');
            setError('');
            window.location.reload();
        } else {
            const resData = await response.json();
            setError(resData.message || 'Erreur inconnue');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border border-slate-700 bg-gray-800 p-4 rounded-lg mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Ajouter une expérience</h3>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="text-white">Titre</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="company" className="text-white">Entreprise</label>
                    <input
                        type="text"
                        id="company"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="text-white">Description</label>
                    <textarea
                        id="company"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <label htmlFor="startDate" className="text-white">Date de début</label>
                        <input
                            type="date"
                            id="startDate"
                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="endDate" className="text-white">Date de fin</label>
                        <input
                            type="date"
                            id="endDate"
                            className="w-full p-2 bg-gray-700 rounded-md text-white"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="contractType" className="text-white">Type de contrat</label>
                    <input
                        type="text"
                        id="contractType"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        required
                    />
                </div>
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded-md">
                Ajouter l&apos;expérience
            </button>
        </form>
    );
};

export default ExperienceForm;

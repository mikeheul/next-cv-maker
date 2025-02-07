'use client';

import { useState } from 'react';

const CandidateForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email,
            address,
            phone,
        };

        const response = await fetch('/api/candidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setAddress('');
            setPhone('');
            setError('');
            window.location.reload();
        } else {
            const resData = await response.json();
            setError(resData.message || 'Erreur inconnue');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Ajouter un candidat</h3>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="text-white">Prénom</label>
                    <input
                        type="text"
                        id="firstName"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="text-white">Nom</label>
                    <input
                        type="text"
                        id="lastName"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="address" className="text-white">Adresse</label>
                    <input
                        type="text"
                        id="address"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="phone" className="text-white">Téléphone</label>
                    <input
                        type="text"
                        id="phone"
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded-md">
                Ajouter le candidat
            </button>
        </form>
    );
};

export default CandidateForm;
